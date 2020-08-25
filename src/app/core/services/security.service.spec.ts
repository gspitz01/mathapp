import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { marbles } from 'rxjs-marbles/jasmine';

const userId1 = 'id245435';
const userId2 = 'id4313498';
const userDisplayName1 = 'Billy Bob';
const userDisplayName2 = 'Wendy Burger';
const expectedMarbleString = 'w 1ms x y |';

function setup(authStateMock: Observable<any>) {
  const authSpy = jasmine.createSpyObj('auth', ['signInWithPopup', 'signOut']);
  const angularFireAuthMock = {
    authState: authStateMock,
    auth: authSpy
  };
  const service = new SecurityService(angularFireAuthMock as AngularFireAuth);
  return {service, authSpy};
}

describe('SecurityService', () => {
  it('should be created', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    expect(service).toBeTruthy();
  }));

  it('should return observable of firebase user on getAuthState()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    expect(service.getAuthState()).toBe(authStateMock);
  }));

  it('should return true if user exists on authenticated()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    const result = service.loggedIn();
    m.expect(result).toBeObservable(expectedMarbleString, { w: false, x: true, y: true });
  }));

  it('should sign in with popup on login()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    service.login();
    expect(authSpy.signInWithPopup).toHaveBeenCalledWith(jasmine.any(auth.GoogleAuthProvider));
  }));

  it('should logout from auth on logout()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    service.logout();
    expect(authSpy.signOut).toHaveBeenCalled();
  }));

  it('should return correct from currentUserIsAnonymous()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    const result = service.currentUserIsAnonymous();
    m.expect(result).toBeObservable(expectedMarbleString, { w: false, x: false, y: true });
  }));

  it('should return correct user id from currentUserId()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    const result = service.currentUserId();
    m.expect(result).toBeObservable(expectedMarbleString, { w: '', x: userId1, y: userId2 });
  }));

  it('should return user display name from currentUserDisplayName()', marbles(m => {
    const authStateMock = m.cold('w-xy|',
      { w: null,
        x: { isAnonymous: false, uid: userId1, displayName: userDisplayName1 } as firebase.User,
        y: { isAnonymous: true, uid: userId2, displayName: userDisplayName2 } as firebase.User });
    const {service, authSpy} = setup(authStateMock);
    const result = service.currentUserDisplayName();
    m.expect(result).toBeObservable(expectedMarbleString, { w: 'Guest', x: userDisplayName1, y: 'Anonymous' });
  }));
});
