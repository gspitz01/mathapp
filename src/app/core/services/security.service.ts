import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private authState: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
  }

  getAuthState(): Observable<firebase.User> {
    return this.authState;
  }

  loggedIn(): Observable<boolean> {
    return this.authState.pipe(
      map(state => {
        if (state) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
  }

  // TODO: this causes an error:
  // ERROR TypeError: You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.
  logout() {
    this.afAuth.auth.signOut();
  }

  currentUserIsAnonymous(): Observable<boolean> {
    return this.authState.pipe(
      map(state => {
        if (state) {
          return state.isAnonymous;
        } else {
          return false;
        }
      }));
  }

  currentUserId(): Observable<string> {
    return this.authState.pipe(
      map(state => {
        if (state) {
          return state.uid;
        } else {
          return '';
        }
      }));
  }

  currentUserDisplayName(): Observable<string> {
    return this.authState.pipe(
      map(state => {
        if (state) {
          if (state.isAnonymous) {
            return 'Anonymous';
          } else {
            return state.displayName || 'User without a name';
          }
        } else {
          return 'Guest';
        }
      })
    );
  }
}
