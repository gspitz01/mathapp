import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState(): Observable<firebase.User> {
    return this.authState;
  }

  authenticated(): boolean {
    return this.currentUser !== null;
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  currentUserIsAnonymous(): boolean {
    return this.authenticated() ? this.currentUser.isAnonymous : false;
  }

  currentUserId(): string {
    return this.authenticated() ? this.currentUser.uid : "";
  }

  currentUserDisplayName(): string {
    if (!this.authenticated()) {
      return "Guest";
    } else if (this.currentUserIsAnonymous()) {
      return "Anonymous";
    } else {
      return this.currentUser['displayName'] || "User without a name";
    }
  }
}
