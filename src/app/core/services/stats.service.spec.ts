import { AngularFireDatabase } from 'angularfire2/database';
import {  Observable, EMPTY, of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { StatsService } from './stats.service';
import { SecurityService } from './security.service';
import { User } from '../domain/models/user';
import { Stats } from '../domain/models/stats';
import { Teacher } from '../domain/models/teacher';
import { Class } from '../domain/models/class';
import { QuestionStats } from '../domain/models/question-stats';
import { QuestionSuccess } from '../domain/models/question-success';
import { OPERATORS_DB_MAP } from '../domain/models/constants';
import { ADDITION } from '../domain/models/basics/basic-operators';

// TODO: rewrite many of these tests and add more
// TODO: Clarify permissions differences between writing userdata like stats
// vs. being able to delete a class etc.

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
    questions: stats.questions
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

const firebaseUser1 = createFakeFirebaseUser(testUserValues[0]);
const firebaseUser2 = createFakeFirebaseUser(testUserValues[1]);
const firebaseUser3 = createFakeFirebaseUser(testUserValues[2]);
const questions = [new QuestionStats(QuestionSuccess.Correct, OPERATORS_DB_MAP.indexOf(ADDITION), [10, 4], [3, 4])];
const stats = new Stats(new Date(), new Date(), 'RoundName', 10, questions);
const teachers = [
  new Teacher('5433535ijoi3j42', 'John Lions', ['fjdfda', 'fdsfdfds']),
  new Teacher('fsdfjklekrw#44', 'Ardvaark Lardsnark', ['Teemer', '545FFS'])
];
const expectedAuthStateMock = {
  x: {uid: '4321432341234'},
  y: {uid: 'er0234234of'},
  z: {uid: 'Something Else'}
};
const expectedLoggedInMock = {
  x: true,
  y: false,
  z: true
};
const expectedCurrentUserIdMock = {
  x: '094234234',
  y: 'er0234234of',
  z: '1kf034234'
};
const expectedCurrentUserDisplayNameMock = {
  x: 'Willie Funyons',
  y: 'Canyon Juxto',
  z: 'Espie Gillespie'
};
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

const userListMockObject = {
  x: [firebaseUser1, firebaseUser2],
  y: [],
  z: [firebaseUser1, firebaseUser2, firebaseUser3]
};

const maxLevelsMockObject = {
  x: maxLevelsObject,
  y: {}
};

const statsListMockObject = {
  x: [],
  y: [createFakeFirebaseStats(stats)]
};

const teacherListMockObject = { x: [],
  y: createFakeFirebaseTeachers(teachers)
};

const classListMockObject = {
  x: [],
  y: [createFakeFirebaseClass(testClassValues[0]), createFakeFirebaseClass(testClassValues[1])]
};

function setup(loggedInMock: Observable<any>, currentUserIdMock: Observable<any>,
  currentUserDisplayNameMock: Observable<any>, authStateMock: Observable<any>,
  userListMock: Observable<any>, maxLevelsMock: Observable<any>, statsListMock: Observable<any>,
  teacherListMock: Observable<any>, classListMock: Observable<any>, adminMock: Observable<any>,
  statsListRefSpyPushReturn: Observable<any>, maxLevelsRefSpyUpdateReturn: Observable<any>,
  usersObjectRefSpyUpdateReturn: Observable<any>, teachersObjectRefSpySetReturn: Observable<any>,
  teachersListRefSpyRemoveReturn: Observable<any>, teacherClassesListRefPushReturn: Observable<any>,
  teacherClassesListRefRemoveReturn: Observable<any>, usersObjectRefSpyRemoveReturn: Observable<any>) {

  const securityServiceSpy = jasmine.createSpyObj('SecurityService',
    ['loggedIn', 'currentUserId', 'currentUserDisplayName', 'getAuthState']);
  securityServiceSpy.loggedIn.and.returnValue(loggedInMock);
  securityServiceSpy.currentUserId.and.returnValue(currentUserIdMock);
  securityServiceSpy.currentUserDisplayName.and.returnValue(currentUserDisplayNameMock);
  securityServiceSpy.getAuthState.and.returnValue(authStateMock);

  const angularFireDbSpy = jasmine.createSpyObj('AngularFireDatabase',
    ['list', 'object']);

  const userListRefSpy = jasmine.createSpyObj('UserListRef', ['snapshotChanges']);
  userListRefSpy.snapshotChanges.and.returnValue(userListMock);
  const statsListRefSpy = jasmine.createSpyObj('StatsListRef', ['snapshotChanges', 'push']);
  statsListRefSpy.snapshotChanges.and.returnValue(statsListMock);
  statsListRefSpy.push.and.returnValue(statsListRefSpyPushReturn);
  const teachersListRefSpy = jasmine.createSpyObj('TeachersListRef', ['snapshotChanges', 'remove']);
  teachersListRefSpy.snapshotChanges.and.returnValue(teacherListMock);
  teachersListRefSpy.remove.and.returnValue(teachersListRefSpyRemoveReturn);
  const teacherClassesListRefSpy = jasmine.createSpyObj('TeacherClassesListRef', ['snapshotChanges', 'push', 'remove']);
  teacherClassesListRefSpy.snapshotChanges.and.returnValue(classListMock);
  teacherClassesListRefSpy.push.and.returnValue(teacherClassesListRefPushReturn);
  teacherClassesListRefSpy.remove.and.returnValue(teacherClassesListRefRemoveReturn);
  angularFireDbSpy.list.and.callFake((refName) => {
    if (refName.includes('userdata')) {
      return statsListRefSpy;
    } else if (refName.includes('teachers')) {
      if (refName.includes('classes')) {
        return teacherClassesListRefSpy;
      } else {
        return teachersListRefSpy;
      }
    } else {
      // object references starting with 'users/'
      return userListRefSpy;
    }
  });

  // Return value for db.object('admins/' + userId) which gets called in
  // getAdminSnapshot, which is now called in the constructor
  const maxLevelsRefSpy = jasmine.createSpyObj('MaxLevelsRef', ['update', 'valueChanges']);
  maxLevelsRefSpy.valueChanges.and.returnValue(maxLevelsMock);
  maxLevelsRefSpy.update.and.returnValue(maxLevelsRefSpyUpdateReturn);
  const usersObjectRefSpy = jasmine.createSpyObj('UsersObjectRef', ['update', 'remove']);
  usersObjectRefSpy.update.and.returnValue(usersObjectRefSpyUpdateReturn);
  usersObjectRefSpy.remove.and.returnValue(usersObjectRefSpyRemoveReturn);
  const teachersObjectRefSpy = jasmine.createSpyObj('TeachersRef', ['set']);
  teachersObjectRefSpy.set.and.returnValue(teachersObjectRefSpySetReturn);
  angularFireDbSpy.object.and.callFake((refName) => {
    if (refName.includes('admins')) {
      return {
        snapshotChanges: function() {
          return adminMock;
        }
      };
    } else if (refName.includes('maxLevels')) {
      return maxLevelsRefSpy;
    } else if (refName.includes('teachers')) {
      return teachersObjectRefSpy;
    } else {
      return usersObjectRefSpy;
    }
  });
  const service = new StatsService(angularFireDbSpy as AngularFireDatabase,
    securityServiceSpy as SecurityService);
  return {service, securityServiceSpy, angularFireDbSpy, usersObjectRefSpy,
    maxLevelsRefSpy, maxLevelsMock, statsListRefSpy, teachersObjectRefSpy,
    teachersListRefSpy, teacherClassesListRefSpy};
}

function normalSetup(m: any) {
  return setup(m.cold('xyz|', expectedLoggedInMock), m.cold('xyz|', expectedCurrentUserIdMock),
    m.cold('xyz|', expectedCurrentUserDisplayNameMock), m.cold('xyz|', expectedAuthStateMock),
    m.cold('xyz|', userListMockObject), m.cold('xy|', maxLevelsMockObject),
    m.cold('xy|', statsListMockObject), m.cold('xy|', teacherListMockObject),
    m.cold('xy|', classListMockObject), m.cold('xyz|', expectedAdminMock),
    m.cold('x|', {x: true}), m.cold('x|', {x: true}),
    m.cold('x|', {x: true}), m.cold('x|', {x: true}), m.cold('x|', {x: true}),
    m.cold('x|', {x: true}), m.cold('x|', {x: true}), m.cold('x|', {x: true}));
}

describe('StatsService', () => {
  it('should create', marbles(m => {
    const {service} = normalSetup(m);
    expect(service).toBeTruthy();
  }));

  it('should return correct admin state on isAdmin()', marbles(m => {
    const {service} = normalSetup(m);
    m.expect(service.isAdmin()).toBeObservable('x y z |', expectedAdmin);
  }));

  it('should return correct values for getAllUsers()', marbles(m => {
    const {service} = normalSetup(m);
    m.expect(service.getAllUsers()).toBeObservable('x y z |', {
      x: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])],
      y: [],
      z: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1]), deconstructUser(testUserValues[2])]
    });
  }));

  it('should return Observable of true if logged in on addStats()', marbles(m => {
    // It should only allow one value through the pipeline because addStats takes the first
    // value from security.loggedIn()
    const {service, securityServiceSpy } = normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x 9ms |', {x: true}));

    const maxLevels = { 'basic-addition': 4 };
    // Not exactly sure why this comes back in 10 ms, presumably it has something to do with
    // the time scale difference outside vs. inside getTestScheduler
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('-(x|)', { x: true });
  }));

  it('should set username on user and push userdata if logged-in on addStats()', marbles(m => {
    const userId = expectedCurrentUserIdMock.x;
    const userDisplayName = expectedCurrentUserDisplayNameMock.x;
    const splitUserName = userDisplayName.split(' ');
    const userLastName = splitUserName[splitUserName.length - 1];
    const maxLevels = { 'basic-addition': 4 };

    const {service, securityServiceSpy, angularFireDbSpy, usersObjectRefSpy, maxLevelsRefSpy, statsListRefSpy} =
      normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: true}));

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
        questions: stats.questions
      });
      subscription.unsubscribe();
    });
  }));

  it('should not subscribe to update of maxLevels if maxLevels is null and logged-in on addStats()', marbles(m => {
    const {service, maxLevelsRefSpy, maxLevelsMock} = normalSetup(m);
    spyOn(maxLevelsMock, 'subscribe');
    const subscription = service.addStats(stats, null).subscribe(success => {
      expect(success).toBeTruthy();
      expect(maxLevelsRefSpy.update).toHaveBeenCalled();
      expect(maxLevelsMock.subscribe).not.toHaveBeenCalled();
      subscription.unsubscribe();
    });
  }));

  it('should return Observable of false if not logged-in on addStats()', marbles(m => {
    // It should only allow one value through the pipeline because addStats takes the first
    // value from security.loggedIn()
    const {service, securityServiceSpy} = normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    const maxLevels = { 'basic-addition': 4 };
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('(x|)', { x: false });
  }));

  it('should not set username nor push userdata if not logged-in on addStats()', marbles(m => {
    const {service, securityServiceSpy, angularFireDbSpy} = normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));

    const maxLevels = { 'basic-addition': 4 };
    service.addStats(stats, maxLevels).subscribe(success => {
      // list() gets called during construction
      expect(angularFireDbSpy.list).toHaveBeenCalled();
      expect(angularFireDbSpy.object).not.toHaveBeenCalledWith('users');
      expect(securityServiceSpy.currentUserDisplayName).not.toHaveBeenCalled();
    });
  }));

  it('should return false if error getting userId update on addStats()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    securityServiceSpy.currentUserId.and.returnValue(m.cold('#|', expectedCurrentUserIdMock, {message: 'Failed user Id look-up'}));

    const maxLevels = { 'basic-addition': 4 };
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('(x|)', {x: false});
  }));

  it('should return false if error getting userDisplayName on addStats()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    securityServiceSpy.currentUserDisplayName.and
      .returnValue(m.cold('#|', expectedCurrentUserDisplayNameMock, {message: 'Failed user name look-up'}));

    const maxLevels = { 'basic-addition': 4 };
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('(x|)', {x: false});
  }));

  it('should return false if error updating user name on addStats()', marbles(m => {
    const {service, usersObjectRefSpy} = normalSetup(m);
    usersObjectRefSpy.update.and.returnValue(m.cold('#|', {}, {message: 'Failed to update username on db'}));
    const maxLevels = { 'basic-addition': 4 };
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('(x|)', {x: false});
  }));

  it('should return false if error pushing stats to db on addStats()', marbles(m => {
    const {service, statsListRefSpy} = normalSetup(m);
    statsListRefSpy.push.and.returnValue(m.cold('#|', {}, {message: 'Failed to push stats to db'}));
    const maxLevels = { 'basic-addition': 4 };
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('(x|)', {x: false});
  }));

  it('should return false if error updating maxLevels on addStats()', marbles(m => {
    const {service, maxLevelsRefSpy} = normalSetup(m);
    maxLevelsRefSpy.update.and.returnValue(m.cold('#|', {}, {message: 'Failed to update maxLevels'}));
    const maxLevels = { 'basic-addition': 4 };
    m.expect(service.addStats(stats, maxLevels)).toBeObservable('(x|)', {x: false});
  }));

  it('should return true if logged-in on addTeacher()', marbles(m => {
    const {service} = normalSetup(m);
    const teacher = new User('REwqer3343', 'A. Teacher', 'Teacher', null);
    m.expect(service.addTeacher(teacher)).toBeObservable('x|', {x: true});
  }));

  it('should add teacher to db on addTeacher() if authenticated', marbles(m => {
    const {service, angularFireDbSpy, teachersObjectRefSpy} = normalSetup(m);
    const teacher = new User('REwqer3343', 'A. Teacher', 'Teacher', null);

    const subscription = service.addTeacher(teacher).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.object).toHaveBeenCalledWith('teachers/' + teacher.id);
      expect(teachersObjectRefSpy.set).toHaveBeenCalledWith({
        name: teacher.name
      });
      subscription.unsubscribe();
    });
  }));

  it('should return false if not logged in on addTeacher()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    const teacher = new User('fdsaf', 'A. Teacher', 'Teacher', null);
    m.expect(service.addTeacher(teacher)).toBeObservable('(x|)', {x: false});
  }));

  it('should not add teacher to db if not logged in on addTeacher()', marbles(m => {
    const {service, angularFireDbSpy, securityServiceSpy} = normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    const teacher = new User('fdsaf', 'A. Teacher', 'Teacher', null);
    const subscription = service.addTeacher(teacher).subscribe(success => {
      expect(success).toBeFalsy();
      expect(angularFireDbSpy.object).not.toHaveBeenCalledWith('teachers');
      subscription.unsubscribe();
    });
  }));

  it('should return false if error setting teacherId on db on addTeacher()', marbles(m => {
    const {service, teachersObjectRefSpy} = normalSetup(m);
    teachersObjectRefSpy.set.and.returnValue(m.cold('#|', {}, {message: 'Failed to set teacher id on db.'}));
    const teacher = new User('fdasdfa', 'A. Teacher', 'Teacher', null);
    m.expect(service.addTeacher(teacher)).toBeObservable('(x|)', {x: false});
  }));

  it('should remove teacher from db if logged in on removeTeacher()', marbles(m => {
    const {service} = normalSetup(m);
    const teacherId = 'teacherId';

    m.expect(service.removeTeacher(teacherId)).toBeObservable('x|', {x: true});
  }));

  it('should call db with teachers if logged in on removeTeacher()', marbles(m => {
    const {service, angularFireDbSpy, teachersListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';

    const sub = service.removeTeacher(teacherId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers');
      expect(teachersListRefSpy.remove).toHaveBeenCalledWith(teacherId);
      sub.unsubscribe();
    });
  }));

  it('should return false if not logged in on removeTeacher()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    m.expect(service.removeTeacher(teacherId)).toBeObservable('(x|)', {x: false});
  }));

  it('should not call db with teachers if not logged in on removeTeacher()', marbles(m => {
    const {service, securityServiceSpy, angularFireDbSpy, teachersListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));

    const sub = service.removeTeacher(teacherId).subscribe(success => {
      expect(success).toBeFalsy();
      expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers');
      expect(teachersListRefSpy.remove).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  }));

  it('should return false if error removing from db on removeTeacher()', marbles(m => {
    const {service, teachersListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    teachersListRefSpy.remove.and.returnValue(m.cold('#|', {}, {message: 'Failed to remove teacher from db'}));
    m.expect(service.removeTeacher(teacherId)).toBeObservable('(x|)', {x: false});
  }));

  it('should return observable of true if logged in on addClassToTeacher()', marbles(m => {
    const {service} = normalSetup(m);
    const teacherId = 'teacherId';
    const className = 'className';
    m.expect(service.addClassToTeacher(teacherId, className)).toBeObservable('x|', {x: true});
  }));

  it('should add class to teacher in db if loggged in on addClassToTeacher()', marbles(m => {
    const {service, angularFireDbSpy, teacherClassesListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const className = 'className';
    const sub = service.addClassToTeacher(teacherId, className).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      expect(teacherClassesListRefSpy.push).toHaveBeenCalledWith({
        name: className
      });
    });
  }));

  it('should return false if not logged in on addClassToTeacher()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const className = 'className';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    m.expect(service.addClassToTeacher(teacherId, className)).toBeObservable('(x|)', {x: false});
  }));

  it('should not add class to teacher if not logged in on addClassToTeacher()', marbles(m => {
    const {service, securityServiceSpy, angularFireDbSpy, teacherClassesListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const className = 'className';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));

    service.addClassToTeacher(teacherId, className).subscribe(success => {
      expect(success).toBeFalsy();
      expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      expect(teacherClassesListRefSpy.push).not.toHaveBeenCalled();
    });
  }));

  it('should return false if error adding to db on addClassToTeacher()', marbles(m => {
    const {service, teacherClassesListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const className = 'className';
    teacherClassesListRefSpy.push.and.returnValue(m.cold('#|', {}, {message: 'Failed to add class to teacher on db'}));
    m.expect(service.addClassToTeacher(teacherId, className)).toBeObservable('(x|)', {x: false});
  }));

  it('should return true if logged in on removeClassFromTeacher()', marbles(m => {
    const {service} = normalSetup(m);
    const teacherId = 'teacherId';
    const classId = 'classId';
    const serviceSpy = spyOn(service, 'removeUsersFromClass');
    serviceSpy.and.returnValue(m.cold('x|', {x: true}));
    m.expect(service.removeClassFromTeacher(teacherId, classId)).toBeObservable('x|', {x: true});
  }));

  it('should remove class from teacher if logged in on removeClassFromTeacher()', marbles(m => {
    const {service, angularFireDbSpy, teacherClassesListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const classId = 'classId';
    const serviceSpy = spyOn(service, 'removeUsersFromClass');
    serviceSpy.and.returnValue(m.cold('x|', {x: true}));

    const sub = service.removeClassFromTeacher(teacherId, classId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      expect(teacherClassesListRefSpy.remove).toHaveBeenCalledWith(classId);
      expect(service.removeUsersFromClass).toHaveBeenCalledWith(classId);
      sub.unsubscribe();
    });
  }));

  it('should return false if not logged in on removeClassFromTeacher()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const classId = 'classId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    m.expect(service.removeClassFromTeacher(teacherId, classId)).toBeObservable('(x|)', {x: false});
  }));

  it('should not remove class from teacher if not logged in on removeClassFromTeacher()', marbles(m => {
    const {service, securityServiceSpy, angularFireDbSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const classId = 'classId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));

    const sub = service.removeClassFromTeacher(teacherId, classId).subscribe(success => {
      expect(success).toBeFalsy();
      expect(angularFireDbSpy.list).not.toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      sub.unsubscribe();
    });
  }));

  it('should return false if error removing class from teacher on db on removeClassFromTeacher()', marbles(m => {
    const {service, teacherClassesListRefSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const classId = 'classId';
    const listRefThen = jasmine.createSpyObj('ListRefThen', ['then']);
    teacherClassesListRefSpy.remove.and.returnValue(listRefThen);
    listRefThen.then.and.returnValue(m.cold('#|', {}, {message: 'Failed to remove class from teacher on db'}));
    m.expect(service.removeClassFromTeacher(teacherId, classId)).toBeObservable('(x|)', {x: false});
  }));

  it('should return true if logged in on addUserToClass()', marbles(m => {
    const {service} = normalSetup(m);
    const classId = 'classId';
    const userId = 'userId';
    m.expect(service.addUserToClass(classId, userId)).toBeObservable('x|', {x: true});
  }));

  it('should add user to class if logged in on addUserToClass()', marbles(m => {
    const {service, angularFireDbSpy, usersObjectRefSpy} = normalSetup(m);
    const classId = 'classId';
    const userId = 'userId';

    const sub = service.addUserToClass(classId, userId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId);
      expect(usersObjectRefSpy.update).toHaveBeenCalledWith({
        classId: classId
      });
      sub.unsubscribe();
    });
  }));

  it('should return false if not logged in on addUserToClass()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    const classId = 'classId';
    const userId = 'userId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    m.expect(service.addUserToClass(classId, userId)).toBeObservable('(x|)', {x: false});
  }));

  it('should not add user to class if not logged in on addUserToClass()', marbles(m => {
    const {service, securityServiceSpy, angularFireDbSpy} = normalSetup(m);
    const classId = 'classId';
    const userId = 'userId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));

    const sub = service.addUserToClass(classId, userId).subscribe(success => {
      expect(success).toBeFalsy();
      expect(angularFireDbSpy.object).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  }));

  it('should return false if error adding user to class on db on addUserToClass()', marbles(m => {
    const {service, usersObjectRefSpy} = normalSetup(m);
    const classId = 'classId';
    const userId = 'userId';
    usersObjectRefSpy.update.and.returnValue(m.cold('#|', {}, {message: 'Failed to add user to class on db.'}));
    m.expect(service.addUserToClass(classId, userId)).toBeObservable('(x|)', {x: false});
  }));

  it('should return true if logged in on removeUserFromClass()', marbles(m => {
    const {service} = normalSetup(m);
    const userId = 'userId';
    m.expect(service.removeUserFromClass(userId)).toBeObservable('x|', {x: true});
  }));

  it('should remove user from class if logged in on removeUserFromClass()', marbles(m => {
    const {service, angularFireDbSpy, usersObjectRefSpy} = normalSetup(m);
    const userId = 'userId';
    const sub = service.removeUserFromClass(userId).subscribe(success => {
      expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + userId + '/classId');
      expect(usersObjectRefSpy.remove).toHaveBeenCalled();
      sub.unsubscribe();
    });
  }));

  it('should return false if not loggeed in on removeUserFromClass()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    const userId = 'userId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    m.expect(service.removeUserFromClass(userId)).toBeObservable('(x|)', {x: false});
  }));

  it('should not remove user from class if not loggeed in on removeUserFromClass()', marbles(m => {
    const {service, securityServiceSpy, angularFireDbSpy} = normalSetup(m);
    const userId = 'userId';
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));

    const sub = service.removeUserFromClass(userId).subscribe(success => {
      expect(success).toBeFalsy();
      expect(angularFireDbSpy.object).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  }));

  it('should return false if error removing user from class on db on removeUserFromClass()', marbles(m => {
    const {service, usersObjectRefSpy} = normalSetup(m);
    const userId = 'userId';
    usersObjectRefSpy.remove.and.returnValue(m.cold('#|', {}, {message: 'Failed to remove user from class on db'}));
    m.expect(service.removeUserFromClass(userId)).toBeObservable('(x|)', {x: false});
  }));

  it('should return true if logged in on removeUsersFromClass()', marbles(m => {
    const {service} = normalSetup(m);
    const classId = testUserValues[0].classId;
    m.expect(service.removeUsersFromClass(classId)).toBeObservable('-(x|)', {x: true});
  }));

  it('should remove all users from db if logged in on removeUsersFromClass()', marbles(m => {
    const {service} = normalSetup(m);
    const classId = testUserValues[0].classId;
    spyOn(service, 'removeUserFromClass').and.callThrough();
    spyOn(service, 'getUsersFromClass').and.callThrough();

    const sub = service.removeUsersFromClass(classId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(service.removeUserFromClass).toHaveBeenCalledWith(testUserValues[0].id);
      expect(service.removeUserFromClass).toHaveBeenCalledWith(testUserValues[1].id);
      sub.unsubscribe();
    });
  }));

  it('should return false if not logged in on removeUsersFromClass()', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    const classId = testUserValues[0].classId;
    securityServiceSpy.loggedIn.and.returnValue(m.cold('x|', {x: false}));
    m.expect(service.removeUsersFromClass(classId)).toBeObservable('(x|)', {x: false});
  }));

  it('should return true if list of users empty on removeUsersFromClass()', marbles(m => {
    const {service} = normalSetup(m);
    const classId = 'UnusedClassId';
    spyOn(service, 'removeUserFromClass').and.callThrough();
    spyOn(service, 'getUsersFromClass').and.callThrough();

    const sub = service.removeUsersFromClass(classId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(service.removeUserFromClass).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  }));

  it('should return Observable of teachers on getTeachers()', marbles(m => {
    const {service} = normalSetup(m);
    m.expect(service.getTeachers()).toBeObservable('xy|',
      {
        x: [],
        y: createTeachersObservableData(teachers)
    });
  }));

  it('should get teachers from db on getTeachers()', marbles(m => {
    const {service, angularFireDbSpy} = normalSetup(m);
    const sub = service.getTeachers().subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers', jasmine.any(Function));
      sub.unsubscribe();
    });
  }));

  it('should return Observable of classes from teacher on getClasesesFromTeacher()', marbles(m => {
    const {service} = normalSetup(m);
    const teacherId = 'teacherId';
    m.expect(service.getClassesFromTeacher(teacherId)).toBeObservable('xy|',
      {
        x: [],
        y: [deconstructClass(testClassValues[0]), deconstructClass(testClassValues[1])]
    });
  }));

  it('should get classes from teacher from db on getClasesesFromTeacher()', marbles(m => {
    const {service, angularFireDbSpy} = normalSetup(m);
    const teacherId = 'teacherId';
    const sub = service.getClassesFromTeacher(teacherId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('teachers/' + teacherId + '/classes');
      sub.unsubscribe();
    });
  }));

  it('should return Observable of users from specific class on getUsersFromClass()', marbles(m => {
    const {service} = normalSetup(m);
    const classId = 'class1Id';
    m.expect(service.getUsersFromClass(classId)).toBeObservable('xyz|',
      {
        x: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])],
        y: [],
        z: [deconstructUser(testUserValues[0]), deconstructUser(testUserValues[1])]
    });
  }));

  it('should get users from specific class from db on getUsersFromClass()', marbles(m => {
    const {service, angularFireDbSpy} = normalSetup(m);
    const classId = 'class1Id';
    const sub = service.getUsersFromClass(classId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('users', jasmine.any(Function));
      sub.unsubscribe();
    });
  }));

  it('should get admin Observable on getAdminSnapshot()', marbles(m => {
    const {service} = normalSetup(m);
    m.expect(service.getAdminSnapshot()).toBeObservable('xyz|', expectedAdminMock);
  }));

  it('should return stats on getStats()', marbles(m => {
    const {service} = normalSetup(m);
    const userId = 'id12343';
    m.expect(service.getStats(userId)).toBeObservable('xy|',
      {
        x: [],
        y: [stats]
    });
  }));

  it('should get stats from db on getStats()', marbles(m => {
    const {service, angularFireDbSpy} = normalSetup(m);
    const userId = 'id12343';
    const sub = service.getStats(userId).subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.list).toHaveBeenCalledWith('userdata/' + userId);
      sub.unsubscribe();
    });
  }));

  it('should return maxLevels on getMaxLevels() if authenticated', marbles(m => {
    const {service} = normalSetup(m);
    // Should only get the first of the values becuase of .pipe(first())
    m.expect(service.getMaxLevels()).toBeObservable('(x|)', {
      x: maxLevelsObject
    });
  }));

  it('should get maxLevels from db on getMaxLevels() if authenticated', marbles(m => {
    const {service, angularFireDbSpy} = normalSetup(m);
    // Should only get the first of the values becuase of .pipe(first())
    const sub = service.getMaxLevels().subscribe(success => {
      expect(success).toBeTruthy();
      expect(angularFireDbSpy.object).toHaveBeenCalledWith('users/' + expectedCurrentUserIdMock.x + '/maxLevels');
      sub.unsubscribe();
    });
  }));

  it('should return empty observable on getMaxLevels if not authenticated', marbles(m => {
    const {service, securityServiceSpy} = normalSetup(m);
    securityServiceSpy.loggedIn.and.returnValue(of(false));
    m.expect(service.getMaxLevels()).toBeObservable('|', {});
  }));
});
