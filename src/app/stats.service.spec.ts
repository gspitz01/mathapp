import { TestBed } from '@angular/core/testing';

import { AngularFireDatabase } from 'angularfire2/database';

import { of, Observable } from 'rxjs';

import { initTestScheduler, resetTestScheduler, cold, getTestScheduler } from 'jasmine-marbles';

import { StatsService } from './stats.service';
import { SecurityService } from './security.service';
import { Stats } from './stats';
import { Spied } from './test-constants';

function createFakeFirebaseUser(testUserValue) {
  return {
    key: testUserValue[0],
    payload: {
      val: function() {
        return {
          name: testUserValue[1]
        }
      }
    }
  }
}

function createFakeUser(testUserValue) {
  return {
    id: testUserValue[0],
    name: testUserValue[1]
  };
}

function createFakeFirebaseStats(stats: Stats) {
  return {
    payload: {
      val: function() {
        return createStatsObservableData(stats);
      }
    }
  };
}

function createStatsObservableData(stats: Stats) {
  return {
    startDate: stats.roundStart,
    endDate: stats.roundEnd,
    name: stats.roundName,
    target: stats.target,
    correct: stats.correct,
    incorrects: stats.incorrects
  }
}

const testUserValues = [
  ["key1", "Kyle"],
  ["key2", "Kathy"],
  ["key3", "Kenneth"]
];

describe('StatsService', () => {
  let securityServiceSpy: Spied<SecurityService>;
  let angularFireDbSpy: Spied<AngularFireDatabase>;
  const firebaseUser1 = createFakeFirebaseUser(testUserValues[0]);
  const firebaseUser2 = createFakeFirebaseUser(testUserValues[1]);
  const firebaseUser3 = createFakeFirebaseUser(testUserValues[2]);
  const stats = new Stats(new Date(), new Date(), "RoundName", 10, 4, [[3, 4], [7, 9]]);

  let statsListMock: Observable<any>;
  let userListMock: Observable<any>;
  let service: StatsService;

  beforeEach(() => {
    initTestScheduler();
    securityServiceSpy = jasmine.createSpyObj('SecurityService',
      ['authenticated', 'currentUserId', 'currentUserDisplayName']);
    angularFireDbSpy = jasmine.createSpyObj('AngularFireDatabase',
      ['list', 'object']);
    userListMock = cold('xyz|',
      { x: [],
        y: [firebaseUser1, firebaseUser2],
        z: [firebaseUser1, firebaseUser2, firebaseUser3] });
    statsListMock = cold('xy|',
      {
        x: [],
        y: [createFakeFirebaseStats(stats)]
    });
    angularFireDbSpy.list.and.callFake((refName) => {
      if (refName.includes('userdata')) {
        console.log(refName);
        return {
          snapshotChanges: function() {
            return statsListMock;
          }
        };
      } else {
        return {
          snapshotChanges: function() {
            return userListMock;
          }
        };
      }
    });
    TestBed.configureTestingModule({
      providers: [
        StatsService,
        { provide: AngularFireDatabase, useValue: angularFireDbSpy },
        { provide: SecurityService, useValue: securityServiceSpy }
      ]
    });

    service = TestBed.get(StatsService);
  });

  afterEach(() => {
    resetTestScheduler();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct values for getAllUsers()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.getAllUsers()).toBe('x 9ms y 9ms z 9ms |', {
        x: [],
        y: [createFakeUser(testUserValues[0]), createFakeUser(testUserValues[1])],
        z: [createFakeUser(testUserValues[0]), createFakeUser(testUserValues[1]), createFakeUser(testUserValues[2])]
      })
    });
  });

  it('should set username on user and push userdata if authenticated on addStats()', () => {
    securityServiceSpy.authenticated.and.returnValue(true);
    const userId = "id4324789";
    securityServiceSpy.currentUserId.and.returnValue(userId);
    const userDisplayName = "Willie";
    securityServiceSpy.currentUserDisplayName.and.returnValue(userDisplayName);

    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['set']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['push']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);

    service.addStats(stats);

    expect(securityServiceSpy.authenticated).toHaveBeenCalled();
    expect(securityServiceSpy.currentUserId).toHaveBeenCalled();
    expect(securityServiceSpy.currentUserDisplayName).toHaveBeenCalled();
    expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId);
    expect(angularFireDbSpy.list).toHaveBeenCalledWith('userdata/' + userId);
    expect(objectRefSpy.set).toHaveBeenCalledWith({ name: userDisplayName});
    expect(listRefSpy.push).toHaveBeenCalledWith({
      startDate: stats.roundStart.getTime(),
      endDate: stats.roundEnd.getTime(),
      name: stats.roundName,
      target: stats.target,
      correct: stats.correct,
      incorrects: stats.incorrects
    });
  });

  it('should not set username nor push userdata if not authenticated on addStats()', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    service.addStats(stats);

    // list() gets called during construction
    expect(angularFireDbSpy.list).toHaveBeenCalled();
    expect(angularFireDbSpy.object).not.toHaveBeenCalled();
    expect(securityServiceSpy.currentUserId).not.toHaveBeenCalled();
    expect(securityServiceSpy.currentUserDisplayName).not.toHaveBeenCalled();
  });

  it('should return same as getAdminSnapshot if authenticated from getAdmin()', () => {
    securityServiceSpy.authenticated.and.returnValue(true);
    const userId = "id13443";
    securityServiceSpy.currentUserId.and.returnValue(userId);
    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['snapshotChanges']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    const adminObservable = of(1, 2, 3);
    objectRefSpy.snapshotChanges.and.returnValue(adminObservable);

    expect(service.getAdmin()).toBe(service.getAdminSnapshot());
    expect(securityServiceSpy.authenticated).toHaveBeenCalled();
  });

  it('should return empty Observable if not authenticated from getAdmin()', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    expect(service.getAdmin()).toBe(of());
  });

  it('should get admin Observable on getAdminSnapshot()', () => {
    const userId = "id1234";
    securityServiceSpy.currentUserId.and.returnValue(userId);
    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['snapshotChanges']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    const adminObservable = of(1, 2, 3);
    objectRefSpy.snapshotChanges.and.returnValue(adminObservable);

    expect(service.getAdminSnapshot()).toBe(adminObservable);
    expect(securityServiceSpy.currentUserId).toHaveBeenCalled();
    expect(angularFireDbSpy.object).toHaveBeenCalled();
    expect(objectRefSpy.snapshotChanges).toHaveBeenCalled();
  });

  it('should get stats from db on getStats()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const userId = "id12343";

      const result = service.getStats(userId);
      expectObservable(result).toBe('x 9ms y 9ms |',
        {
          x: [],
          y: [createStatsObservableData(stats)]
      });

      expect(angularFireDbSpy.list).toHaveBeenCalledWith('userdata/' + userId);
    });
  });
});
