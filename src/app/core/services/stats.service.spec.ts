import { TestBed } from '@angular/core/testing';

import { AngularFireDatabase } from 'angularfire2/database';

import { of, Observable } from 'rxjs';

import { initTestScheduler, resetTestScheduler, cold, getTestScheduler } from 'jasmine-marbles';

import { StatsService } from './stats.service';
import { SecurityService } from './security.service';
import { Stats } from '../../shared/models/stats';
import { Spied } from '../../shared/models/test-constants.spec';
import { Teacher } from 'src/app/shared/models/teacher';
import { User } from 'src/app/shared/models/user';
import { Class } from 'src/app/shared/models/class';

function createFakeFirebaseUser(testUserValue: User) {
  return {
    key: testUserValue.id,
    payload: {
      val: function() {
        return {
          name: testUserValue.name,
          classId: testUserValue.classId
        }
      }
    }
  }
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
  }
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
    }
  });
}

function createTeacherObservableData(teacher: Teacher) {
  return {
    displayName: teacher.name,
    classes: teacher.classIds
  }
}

function createTeachersObservableData(teachers: Teacher[]) {
  return teachers.map((teacher) => {
    return {
      id: teacher.id,
      displayName: teacher.name,
      classes: teacher.classIds
    }
  });
}

function createFakeFirebaseClass(clazz: Class) {
  return {
    key: clazz.id,
    payload: {
      val: function() {
        return {
          name: clazz.name
        }
      }
    }
  }
}

function deconstructClass(clazz: Class) {
  return {
    id: clazz.id,
    name: clazz.name
  };
}

const testUserValues: User[] = [
  new User("key1", "Kyle", "Farnsworth", "class1Id"),
  new User("key2", "Kathy", "Gillespie", "class1Id"),
  new User("key3", "Kenneth", "Anchovie", "class2Id")
];

const testClassValues: Class[] = [
  new Class("class1Id", "Class 1"),
  new Class("class2Id", "Class Number 2")
];

describe('StatsService', () => {
  let securityServiceSpy: Spied<SecurityService>;
  let angularFireDbSpy: Spied<AngularFireDatabase>;
  const firebaseUser1 = createFakeFirebaseUser(testUserValues[0]);
  const firebaseUser2 = createFakeFirebaseUser(testUserValues[1]);
  const firebaseUser3 = createFakeFirebaseUser(testUserValues[2]);
  const stats = new Stats(new Date(), new Date(), "RoundName", 10, 4, [[3, 4], [7, 9]]);
  const teachers = [
    new Teacher("5433535ijoi3j42", "John Lions", ["fjdfda", "fdsfdfds"]),
    new Teacher("fsdfjklekrw#44", "Ardvaark Lardsnark", ["Teemer", "545FFS"])
  ];

  let statsListMock: Observable<any>;
  let userListMock: Observable<any>;
  let teacherListMock: Observable<any>;
  let classListMock: Observable<any>;
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
    teacherListMock = cold('xy|',
      { x: [],
        y: createFakeFirebaseTeachers(teachers)
    });
    classListMock = cold('xy|',
      {
        x: [],
        y: [createFakeFirebaseClass(testClassValues[0]), createFakeFirebaseClass(testClassValues[1])]
    });
    angularFireDbSpy.list.and.callFake((refName) => {
      if (refName.includes('userdata')) {
        return {
          snapshotChanges: function() {
            return statsListMock;
          }
        };
      } else if (refName.includes('teachers')) {
        if (refName.includes('classes')) {
          return {
            snapshotChanges: function() {
              return classListMock;
            }
          }
        } else {
          return {
            snapshotChanges: function() {
              return teacherListMock;
            }
          }
        }
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
        y: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])],
        z: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1]), deconstructUser(testUserValues[2])]
      })
    });
  });

  it('should set username on user and push userdata if authenticated on addStats()', () => {
    securityServiceSpy.authenticated.and.returnValue(true);
    const userId = "id4324789";
    securityServiceSpy.currentUserId.and.returnValue(userId);
    const userDisplayName = "Willie Funyions";
    securityServiceSpy.currentUserDisplayName.and.returnValue(userDisplayName);
    const userNameSplit = userDisplayName.split(' ');
    const userLastName = userNameSplit[userNameSplit.length - 1];

    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['update']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);
    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['push']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);

    service.addStats(stats);

    expect(securityServiceSpy.authenticated).toHaveBeenCalled();
    expect(securityServiceSpy.currentUserId).toHaveBeenCalled();
    expect(securityServiceSpy.currentUserDisplayName).toHaveBeenCalled();
    expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId);
    expect(angularFireDbSpy.list).toHaveBeenCalledWith('userdata/' + userId);
    expect(objectRefSpy.update).toHaveBeenCalledWith({
      name: userDisplayName,
      lastName: userLastName
    });
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

  it('should add teacher to db on addTeacher() if authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(true);

    const teacher = new User("REwqer3343", "A. Teacher", "Teacher", null);

    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['set']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);

    service.addTeacher(teacher);

    expect(angularFireDbSpy.object).toHaveBeenCalledWith('teachers/' + teacher.id);
    expect(objectRefSpy.set).toHaveBeenCalledWith({
      name: teacher.name
    });
  });

  it('should not add teacher to db on addTeacher() if not authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    const teacher = new User("fdsaf", "A. Teacher", "Teacher", null);

    service.addTeacher(teacher);

    expect(angularFireDbSpy.object).not.toHaveBeenCalled();
  });

  it('should remove teacher from db on removeTeacher() if authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(true);

    const teacherId = "teacherId";

    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['remove']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);

    service.removeTeacher(teacherId);

    expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers');
    expect(listRefSpy.remove).toHaveBeenCalledWith(teacherId);
  });

  it('should not remove teacher from db on removeTeacher() if not authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    const teacherId = "teacherId";

    service.removeTeacher(teacherId);

    expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers');
  });

  it('should add class to teacher on addClassToTeacher if authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(true);

    const teacherId = "teacherId";
    const className = "className";

    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['push']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);

    service.addClassToTeacher(teacherId, className);

    expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
    expect(listRefSpy.push).toHaveBeenCalledWith({
      name: className
    });
  });

  it('should not add class to teacher on addClassToTeacher() if not authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    const teacherId = "teacherId";
    const className = "className";

    service.addClassToTeacher(teacherId, className);

    // list() gets called during construction
    expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
  });

  it('should remove class from teacher on removeClassFromTeacher() if authenticated', (done) => {
    securityServiceSpy.authenticated.and.returnValue(true);

    const teacherId = "teacherId";
    const classId = "classId";

    const listRefSpy = jasmine.createSpyObj('AngularFireList', ['remove']);
    angularFireDbSpy.list.and.returnValue(listRefSpy);
    const removePromise = Promise.resolve();
    console.log(removePromise);
    listRefSpy.remove.and.returnValue(removePromise);
    const serviceSpy = spyOn(service, 'removeUsersFromClass');

    service.removeClassFromTeacher(teacherId, classId);

    listRefSpy.remove.calls.mostRecent().returnValue.then(() => {
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      expect(listRefSpy.remove).toHaveBeenCalledWith(classId);
      expect(service.removeUsersFromClass).toHaveBeenCalledWith(classId);
      done();
    });

  });

  it('should not remove class from teacher on removeClassFromTeacher() if not authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    const teacherId = "teacherId";
    const classId = "classId";

    service.removeClassFromTeacher(teacherId, classId);

    expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
  });

  it('should add user to class on addUserToClass() if authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(true);

    const classId = "classId";
    const userId = "userId";

    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['update']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);

    service.addUserToClass(classId, userId);

    expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId);
    expect(objectRefSpy.update).toHaveBeenCalledWith({
      classId: classId
    });
  });

  it('should not add user to class on addUserToClass() if not authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    const classId = "classId";
    const userId = "userId";

    service.addUserToClass(classId, userId);

    expect(angularFireDbSpy.object).not.toHaveBeenCalled();
  });

  it('should remove user from class on removeUserFromClass() if authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(true);

    const userId = "userId";

    const objectRefSpy = jasmine.createSpyObj('AngularFireObject', ['remove']);
    angularFireDbSpy.object.and.returnValue(objectRefSpy);

    service.removeUserFromClass(userId);

    expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId + '/classId');
    expect(objectRefSpy.remove).toHaveBeenCalled();
  });

  it('should not remove user from class on removeUserFromClass() if not authenticated', () => {
    securityServiceSpy.authenticated.and.returnValue(false);

    const userId = "userId";

    service.removeUserFromClass(userId);

    expect(angularFireDbSpy.object).not.toHaveBeenCalled();
  });

  // TODO: figure out how to test this correctly
  // Running into the last two expectations not working and it fudging up the test
  // for getUsersFromClass() below
  // it('should remove all users from class on removeUsersFromClass if authenticated', () => {
  //   getTestScheduler().run(helpers => {
  //     securityServiceSpy.authenticated.and.returnValue(true);

  //     const classId = "class1Id";

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
    })
  });

  it('should return Observable of classes from teacher on getClasesesFromTeacher()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;

      const teacherId = "teacherId";
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

      const classId = "class1Id";
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
