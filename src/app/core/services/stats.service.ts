import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SecurityService } from './security.service';
import { Stats } from '../../shared/models/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private allUsers: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
    private security: SecurityService) {
      this.allUsers = this.db.list('users').snapshotChanges().pipe(
        map(users => users.map(user => ({ id: user.key, ...user.payload.val() })))
      );
  }

  addStats(stats: Stats) {
    if (this.security.authenticated()) {
      let userId = this.security.currentUserId();
      this.db.object('users/' + userId).set({
        name: this.security.currentUserDisplayName()
      });
      this.db.list('userdata/' + userId).push({
        startDate: stats.roundStart.getTime(),
        endDate: stats.roundEnd.getTime(),
        name: stats.roundName,
        target: stats.target,
        correct: stats.correct,
        incorrects: stats.incorrects
      });
    }
  }

  getAdmin(): Observable<any> {
    if (this.security.authenticated()) {
      return this.getAdminSnapshot();
    } else {
      return of();
    }
  }

  getAdminSnapshot(): Observable<any> {
    let userId = this.security.currentUserId();
    return this.db.object('admins/' + userId).snapshotChanges();
  }

  getAllUsers(): Observable<any[]> {
    return this.allUsers;
  }

  getStats(userId: string): Observable<any[]> {
    return this.db.list('userdata/' + userId).snapshotChanges().pipe(
      map(stats => stats.map(stat => ({...stat.payload.val()})))
    );
  }
}
