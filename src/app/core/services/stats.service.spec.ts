import { TestBed } from '@angular/core/testing';

import { AngularFireDatabase } from 'angularfire2/database';

import { of, Observable, EMPTY } from 'rxjs';

import { initTestScheduler, resetTestScheduler, cold, getTestScheduler } from 'jasmine-marbles';

import { StatsService } from './stats.service';
import { SecurityService } from './security.service';
import { User } from '../domain/models/user';
import { Stats } from '../domain/models/stats';
import { Teacher } from '../domain/models/teacher';
import { Class } from '../domain/models/class';
import { Spied } from '../domain/models/test-constants.spec';

// TODO: rewrite many of these tests and add more

function createFakeFirebaseUser(testUserValue: User) {
  return {
    key: testUserValue.id,
    payload: {
      val: function() {
        return {
          name: testUserValue.name,
          classId: testUserValue.classId
        };
      }
    }
  };
}

function deconstructUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    classId: user.classId
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
  };
}

function createFakeFirebaseTeachers(teachers: Teacher[]) {
  return teachers.map((teacher) => {
    return {
      key: teacher.id,
      payload: {
        val: function() {
          return createTeacherObservableData(teacher);
        }
      }
    };
  });
}

function createTeacherObservableData(teacher: Teacher) {
  return {
    displayName: teacher.name,
    classes: teacher.classIds
  };
}

function createTeachersObservableData(teachers: Teacher[]) {
  return teachers.map((teacher) => {
    return {
      id: teacher.id,
      displayName: teacher.name,
      classes: teacher.classIds
    };
  });
}

function createFakeFirebaseClass(clazz: Class) {
  return {
    key: clazz.id,
    payload: {
      val: function() {
        return {
          name: clazz.name
        };
      }
    }
  };
}

function deconstructClass(clazz: Class) {
  return {
    id: clazz.id,
    name: clazz.name
  };
}

const testUserValues: User[] = [
  new User('key1', 'Kyle', 'Farnsworth', 'class1Id'),
  new User('key2', 'Kathy', 'Gillespie', 'class1Id'),
  new User('key3', 'Kenneth', 'Anchovie', 'class2Id')
];

const testClassValues: Class[] = [
  new Class('class1Id', 'Class 1'),
  new Class('class2Id', 'Class Number 2')
];

const maxLevelsObject = {
  'basic-addition': 4
};

describe('StatsService', () => {
  let securityServiceSpy: Spied<SecurityService>;
  let angularFireDbSpy: Spied<AngularFireDatabase>;
  const firebaseUser1 = createFakeFirebaseUser(testUserValues[0]);
  const firebaseUser2 = createFakeFirebaseUser(testUserValues[1]);
  const firebaseUser3 = createFakeFirebaseUser(testUserValues[2]);
  const stats = new Stats(new Date(), new Date(), 'RoundName', 10, 4, [[3, 4], [7, 9]]);
  const teachers = [
    new Teacher('5433535ijoi3j42', 'John Lions', ['fjdfda', 'fdsfdfds']),
    new Teacher('fsdfjklekrw#44', 'Ardvaark Lardsnark', ['Teemer', '545FFS'])
  ];

  const threeVarMarble = 'x 9ms y 9ms z 9ms |';
  let statsListMock: Observable<any>;
  let statsListRefSpy: Spied<any>;
  let userListMock: Observable<any>;
  let userListRefSpy: Spied<any>;
  let usersObjectRefSpy: Spied<any>;
  let maxLevelsMock: Observable<any>;
  let maxLevelsRefSpy: Spied<any>;
  let teacherListMock: Observable<any>;
  let classListMock: Observable<any>;
  let authStateMock: Observable<any>;
  const expectedAuthStateMock = {
    x: {uid: '4321432341234'},
    y: {uid: 'er0234234of'},
    z: {uid: 'Something Else'}
  };
  let loggedInMock: Observable<any>;
  const expectedLoggedInMock = {
    x: true,
    y: false,
    z: true
  };
  let currentUserIdMock: Observable<any>;
  const expectedCurrentUserIdMock = {
    x: '094234234',
    y: 'er0234234of',
    z: '1kf034234'
  };
  let currentUserDisplayNameMock: Observable<any>;
  const expectedCurrentUserDisplayNameMock = {
    x: 'Willie Funyons',
    y: 'Canyon Juxto',
    z: 'Espie Gillespie'
  };
  let adminMock: Observable<any>;
  const expectedAdminMock = {
    x: {key: 'whatevs'},
    y: {key: 'er0234234of'},
    z: {key: 'sure'}
  };
  // This is for checking to see if admin works
  // y is true because the uid for expectedAuthStateMock
  // is the same at y as expectedAdminMock
  const expectedAdmin = {
    x: false,
    y: true,
    z: false
  };
  let service: StatsService;

  beforeEach(() => {
    initTestScheduler();
    securityServiceSpy = jasmine.createSpyObj('SecurityService',
      ['loggedIn', 'currentUserId', 'currentUserDisplayName', 'getAuthState']);
    loggedInMock = cold('xyz|', expectedLoggedInMock);
    securityServiceSpy.loggedIn.and.returnValue(loggedInMock);
    currentUserIdMock = cold('xyz|', expectedCurrentUserIdMock);
    securityServiceSpy.currentUserId.and.returnValue(currentUserIdMock);
    currentUserDisplayNameMock = cold('xyz|', expectedCurrentUserDisplayNameMock);
    securityServiceSpy.currentUserDisplayName.and.returnValue(currentUserDisplayNameMock);
    authStateMock = cold('xyz|', expectedAuthStateMock);
    securityServiceSpy.getAuthState.and.returnValue(authStateMock);

    angularFireDbSpy = jasmine.createSpyObj('AngularFireDatabase',
      ['list', 'object']);
    userListMock = cold('xyz|',
      { x: [],
        y: [firebaseUser1, firebaseUser2],
        z: [firebaseUser1, firebaseUser2, firebaseUser3] });
    maxLevelsMock = cold('xy|', {
      x: maxLevelsObject,
      y: {}
    });
    statsListMock = cold('xy|',
      {
        x: [],
        y: [createFakeFirebaseStats(stats)]
    });
    teacherListMock = cold('xy|',
      { x: [],
        y: createFakeFirebaseTeachers(teachers)
    });
    classListMock = cold('xy|',
      {
        x: [],
        y: [createFakeFirebaseClass(testClassValues[0]), createFakeFirebaseClass(testClassValues[1])]
    });
    adminMock = cold('xyz|', expectedAdminMock);

    userListRefSpy = jasmine.createSpyObj('UserListRef', ['snapshotChanges']);
    userListRefSpy.snapshotChanges.and.returnValue(userListMock);
    statsListRefSpy = jasmine.createSpyObj('StatsListRef', ['snapshotChanges', 'push']);
    statsListRefSpy.snapshotChanges.and.returnValue(statsListMock);
    statsListRefSpy.push.and.returnValue(cold('x|', {x: true}));
    angularFireDbSpy.list.and.callFake((refName) => {
      if (refName.includes('userdata')) {
        return statsListRefSpy;
      } else if (refName.includes('teachers')) {
        if (refName.includes('classes')) {
          return {
            snapshotChanges: function() {
              return classListMock;
            }
          };
        } else {
          return {
            snapshotChanges: function() {
              return teacherListMock;
            }
          };
        }
      } else {
        // object references starting with 'users/'
        return userListRefSpy;
      }
    });

    // Return value for db.object('admins/' + userId) which gets called in
    // getAdminSnapshot, which is now called in the constructor
    maxLevelsRefSpy = jasmine.createSpyObj('MaxLevelsRef', ['update', 'valueChanges']);
    maxLevelsRefSpy.valueChanges.and.returnValue(maxLevelsMock);
    maxLevelsRefSpy.update.and.returnValue(cold('x|', {x: true}));
    usersObjectRefSpy = jasmine.createSpyObj('UsersObjectRef', ['update']);
    usersObjectRefSpy.update.and.returnValue(cold('x|', {x: true}));
    angularFireDbSpy.object.and.callFake((refName) => {
      if (refName.includes('admins')) {
        return {
          snapshotChanges: function() {
            return adminMock;
          }
        };
      } else if (refName.includes('maxLevels')) {
        return maxLevelsRefSpy;
      } else {
        return usersObjectRefSpy;
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

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct admin state on isAdmin()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.isAdmin()).toBe('x 9ms y 9ms z 9ms |', expectedAdmin);
    });
  });

  it('should return correct values for getAllUsers()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.getAllUsers()).toBe('x 9ms y 9ms z 9ms |', {
        x: [],
        y: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])],
        z: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1]), deconstructUser(testUserValues[2])]
      });
    });
  });

  it('should return Observable of true if logged in on addStats()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const maxLevels = { 'basic-addition': 4 };
      // It should only allow one value through the pipeline because addStats takes the first
      // value from security.loggedIn()
      loggedInMock = cold('x 9ms |', {x: true});
      securityServiceSpy.loggedIn.and.returnValue(loggedInMock);
      // Not exactly sure why this comes back in 10 ms, presumably it has something to do with
      // the time scale difference outside vs. inside getTestScheduler
      expectObservable(service.addStats(stats, maxLevels)).toBe('10ms (x|)', { x: true });
    });
  });

  it('should return Observable of false if not logged in on addStats()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const maxLevels = { 'basic-addition': 4 };
      // It should only allow one value through the pipeline because addStats takes the first
      // value from security.loggedIn()
      loggedInMock = cold('x|', {x: false});
      securityServiceSpy.loggedIn.and.returnValue(loggedInMock);
      expectObservable(service.addStats(stats, maxLevels)).toBe('(x|)', { x: false });
    });
  });

  it('should set username on user and push userdata if logged-in on addStats()', (done) => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;

      const userId = expectedCurrentUserIdMock.x;
      const userDisplayName = expectedCurrentUserDisplayNameMock.x;
      const splitUserName = userDisplayName.split(' ');
      const userLastName = splitUserName[splitUserName.length - 1];

      loggedInMock = cold('xyz|', {x: true});
      securityServiceSpy.loggedIn.and.returnValue(loggedInMock);
      const maxLevels = { 'basic-addition': 4 };
      const subscription = service.addStats(stats, maxLevels).subscribe(success => {
        expect(success).toBeTruthy();
        expect(securityServiceSpy.loggedIn).toHaveBeenCalled();
        expect(securityServiceSpy.currentUserId).toHaveBeenCalled();
        expect(securityServiceSpy.currentUserDisplayName).toHaveBeenCalled();
        expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId);
        expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId + '/maxLevels');
        expect(angularFireDbSpy.list).toHaveBeenCalledWith('userdata/' + userId);
        expect(usersObjectRefSpy.update).toHaveBeenCalledWith({
          name: userDisplayName,
          lastName: userLastName
        });
        expect(maxLevelsRefSpy.update).toHaveBeenCalledWith(maxLevels);
        expect(statsListRefSpy.push).toHaveBeenCalledWith({
          startDate: stats.roundStart.getTime(),
          endDate: stats.roundEnd.getTime(),
          name: stats.roundName,
          target: stats.target,
          correct: stats.correct,
          incorrects: stats.incorrects
        });
        subscription.unsubscribe();
        done();
      });
    });
  });

  it('should not set username nor push userdata if not authenticated on addStats()', () => {
    const maxLevels = { 'basic-addition': 4 };
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      service.addStats(stats, maxLevels);
      // list() gets called during construction
      expect(angularFireDbSpy.list).toHaveBeenCalled();
      expect(angularFireDbSpy.object).not.toHaveBeenCalledWith('users');
      expect(securityServiceSpy.currentUserDisplayName).not.toHaveBeenCalled();
    });
  });

  it('should add teacher to db on addTeacher() if authenticated', () => {
    const teacher = new User('REwqer3343', 'A. Teacher', 'Teacher', null);
    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['set']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    objectRefSpy.set.and.returnValue(cold('x|', {x: true}));

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.addTeacher(teacher)).toBe('x 9ms |', {x: true});
      // expect(angularFireDbSpy.object).toHaveBeenCalledWith('teachers/' + teacher.id);
      // expect(objectRefSpy.set).toHaveBeenCalledWith({
      //   name: teacher.name
      // });
    });
  });

  it('should not add teacher to db on addTeacher() if not authenticated', () => {
    const teacher = new User('fdsaf', 'A. Teacher', 'Teacher', null);

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      service.addTeacher(teacher);
      expect(angularFireDbSpy.object).not.toHaveBeenCalledWith('teachers');
    });
  });

  it('should remove teacher from db on removeTeacher() if authenticated', () => {
    const teacherId = 'teacherId';
    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['remove']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);
    listRefSpy.remove.and.returnValue(cold('x|', {x: true}));

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.removeTeacher(teacherId)).toBe('x 9ms |', {x: true});

      // expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers');
      // expect(listRefSpy.remove).toHaveBeenCalledWith(teacherId);
    });
  });

  it('should not remove teacher from db on removeTeacher() if not authenticated', () => {
    const teacherId = 'teacherId';
    getTestScheduler().run(helpers => {
      service.removeTeacher(teacherId);

      expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers');
    });
  });

  it('should add class to teacher on addClassToTeacher if authenticated', () => {
    const teacherId = 'teacherId';
    const className = 'className';
    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['push']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);
    listRefSpy.push.and.returnValue(cold('x|', {x: true}));

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.addClassToTeacher(teacherId, className)).toBe('x 9ms |', {x: true});

      // expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      // expect(listRefSpy.push).toHaveBeenCalledWith({
      //   name: className
      // });
    });
  });

  it('should not add class to teacher on addClassToTeacher() if not authenticated', () => {
    const teacherId = 'teacherId';
    const className = 'className';

    getTestScheduler().run(helpers => {
      service.addClassToTeacher(teacherId, className);

      // list() gets called during construction
      expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
    });
  });

  it('should remove class from teacher on removeClassFromTeacher() if authenticated', () => {
    const teacherId = 'teacherId';
    const classId = 'classId';
    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['remove']);
    const listRefThen = jasmine.createSpyObj('ListRefThen', ['then']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);
    listRefSpy.remove.and.returnValue(listRefThen);
    listRefThen.then.and.returnValue(cold('x|', {x: true}));
    const serviceSpy = spyOn(service, 'removeUsersFromClass');

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.removeClassFromTeacher(teacherId, classId)).toBe('x 9ms |', {x: true});
      // expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      // expect(listRefSpy.remove).toHaveBeenCalledWith(classId);
      // expect(service.removeUsersFromClass).toHaveBeenCalledWith(classId);
    });
  });

  it('should not remove class from teacher on removeClassFromTeacher() if not authenticated', () => {
    const teacherId = 'teacherId';
    const classId = 'classId';

    getTestScheduler().run(helpers => {
      service.removeClassFromTeacher(teacherId, classId);

      expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
    });

  });

  it('should add user to class on addUserToClass() if authenticated', () => {
    const classId = 'classId';
    const userId = 'userId';
    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['update']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    objectRefSpy.update.and.returnValue(cold('x|', {x: true}));

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.addUserToClass(classId, userId)).toBe('x 9ms |', {x: true});
      // expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId);
      // expect(objectRefSpy.update).toHaveBeenCalledWith({
      //   classId: classId
      // });
    });
  });

  it('should not add user to class on addUserToClass() if not authenticated', () => {
    const classId = 'classId';
    const userId = 'userId';

    getTestScheduler().run(helpers => {
      service.addUserToClass(classId, userId);
      expect(angularFireDbSpy.object).not.toHaveBeenCalled();
    });
  });

  it('should remove user from class on removeUserFromClass() if authenticated', () => {
    const userId = 'userId';
    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['remove']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    objectRefSpy.remove.and.returnValue(cold('x|', {x: true}));

    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.removeUserFromClass(userId)).toBe('x 9ms |', {x: true});

      // expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId + '/classId');
      // expect(objectRefSpy.remove).toHaveBeenCalled();
    });
  });

  it('should not remove user from class on removeUserFromClass() if not authenticated', () => {
    const userId = 'userId';
    getTestScheduler().run(helpers => {
      service.removeUserFromClass(userId);

      expect(angularFireDbSpy.object).not.toHaveBeenCalled();
    });
  });

  // TODO: figure out how to test this correctly
  // Running into the last two expectations not working and it fudging up the test
  // for getUsersFromClass() below
  // it('should remove all users from class on removeUsersFromClass if authenticated', () => {
  //   getTestScheduler().run(helpers => {
  //     securityServiceSpy.loggedIn.and.returnValue(true);

  //     const classId = 'class1Id';

  //     spyOn(service, 'removeUserFromClass');
  //     spyOn(service, 'getUsersFromClass').and.callThrough();

  //     service.removeUsersFromClass(classId);

  //     expect(service.getUsersFromClass).toHaveBeenCalledWith(classId);
  //     expect(service.removeUserFromClass).toHaveBeenCalledWith(testUserValues[0].id);
  //     expect(service.removeUserFromClass).toHaveBeenCalledWith(testUserValues[1].id);
  //   });
  // });

  it('should return Observable of teachers on getTeachers()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;

      const result = service.getTeachers();
      expectObservable(result).toBe('x 9ms y 9ms |',
        {
          x: [],
          y: createTeachersObservableData(teachers)
      });

      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers', jasmine.any(Function));
    });
  });

  it('should return Observable of classes from teacher on getClasesesFromTeacher()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;

      const teacherId = 'teacherId';
      const result = service.getClassesFromTeacher(teacherId);
      expectObservable(result).toBe('x 9ms y 9ms |',
        {
          x: [],
          y: [deconstructClass(testClassValues[0]), deconstructClass(testClassValues[1])]
      });

      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
    });
  });

  it('should return Observable of users from specific class on getUsersFromClass()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;

      const classId = 'class1Id';
      const result = service.getUsersFromClass(classId);
      expectObservable(result).toBe('x 9ms y 9ms z 9ms |',
        {
          x: [],
          y: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])],
          z: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])]
      });

      expect(angularFireDbSpy.list).toHaveBeenCalledWith('users', jasmine.any(Function));
    });
  });

  it('should get admin Observable on getAdminSnapshot()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      expectObservable(service.getAdminSnapshot()).toBe(threeVarMarble, expectedAdminMock);
    });
  });

  it('should get stats from db on getStats()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const userId = 'id12343';

      const result = service.getStats(userId);
      expectObservable(result).toBe('x 9ms y 9ms |',
        {
          x: [],
          y: [stats]
      });

      expect(angularFireDbSpy.list).toHaveBeenCalledWith('userdata/' + userId);
    });
  });

  it('should get maxLevels from db on getMaxLevels() if authenticated', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;

      const result = service.getMaxLevels();
      // Should only get the first of the values becuase of .pipe(first())
      expectObservable(result).toBe('(x|)', {
        x: maxLevelsObject
      });

      // expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId + '/maxLevels');
    });
  });

  it('should return empty observable on getMaxLevels if not authenticated', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      securityServiceSpy.loggedIn.and.returnValue(of(false));

      const result = service.getMaxLevels();
      expectObservable(result).toBe('|', {});
    });
  });
});
