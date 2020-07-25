import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

import { Observable } from 'rxjs';

import { cold, getTestScheduler, initTestScheduler, resetTestScheduler } from 'jasmine-marbles';

import { SecurityService } from './security.service';


describe('SecurityService', () => {
  const userId1 = 'id245435';
  const userId2 = 'id4313498';
  const userDisplayName1 = 'Billy Bob';
  const userDisplayName2 = 'Wendy Burger';
  const authSpy = jasmine.createSpyObj('auth', ['signInWithPopup', 'signOut']);
  const expectedMarbleString = 'w 19ms x 9ms y 9ms |';
  let authStateMock: Observable<any>;
  let angularFireAuthMock: any;
  let service: SecurityService;

  beforeEach(() => {
    initTestScheduler();
    authStateMock = cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    angularFireAuthMock = {
      authState: authStateMock,
      auth: authSpy
    };
    TestBed.configureTestingModule({
      providers: [
        SecurityService,
        { provide: AngularFireAuth, useValue: angularFireAuthMock }
      ]
    });
    service = TestBed.inject(SecurityService);
  });

  afterEach(() => { resetTestScheduler(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return observable of firebase user on getAuthState()', () => {
    expect(service.getAuthState()).toBe(authStateMock);
  });

  it('should return true if user exists on authenticated()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const result = service.loggedIn();
      expectObservable(result).toBe(expectedMarbleString, { w: false, x: true, y: true });
    });
  });

  it('should sign in with popup on login()', () => {
    service.login();
    expect(authSpy.signInWithPopup).toHaveBeenCalledWith(jasmine.any(auth.GoogleAuthProvider));
  });

  it('should logout from auth on logout()', () => {
    service.logout();
    expect(authSpy.signOut).toHaveBeenCalled();
  });

  it('should return correct from currentUserIsAnonymous()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const result = service.currentUserIsAnonymous();
      expectObservable(result).toBe(expectedMarbleString, { w: false, x: false, y: true });
    });
  });

  it('should return correct user id from currentUserId()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const result = service.currentUserId();
      expectObservable(result).toBe(expectedMarbleString, { w: '', x: userId1, y: userId2 });
    });
  });

  it('should return user display name from currentUserDisplayName()', () => {
    getTestScheduler().run(helpers => {
      const { expectObservable } = helpers;
      const result = service.currentUserDisplayName();
      expectObservable(result).toBe(expectedMarbleString, { w: 'Guest', x: userDisplayName1, y: 'Anonymous' });
    });
  });
});
