import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable, of } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { SecurityService } from './security.service';
import { Stats } from '../../shared/models/stats';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private allUsers: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
    private security: SecurityService) {
      this.allUsers = this.db.list('users', ref => ref.orderByChild('lastName')).snapshotChanges().pipe(
        map(users => users.map(user => ({ id: user.key, ...user.payload.val() })))
      );
  }

  addStats(stats: Stats, maxLevels: Object) {
    if (this.security.authenticated()) {
      let userId = this.security.currentUserId();
      let userName = this.security.currentUserDisplayName();
      let splitName = userName.split(' ');
      this.db.object('users/' + userId).update({
        name: userName,
        lastName: splitName[splitName.length - 1]
      });
      if (maxLevels != null) {
        this.db.object('users/' + userId + '/maxLevels').update(maxLevels);
      }
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

  addTeacher(teacher: User) {
    if (this.security.authenticated()) {
      this.db.object('teachers/' + teacher.id).set({
        name: teacher.name
      });
    }
  }

  removeTeacher(teacherId: string) {
    if (this.security.authenticated()) {
      this.db.list('teachers').remove(teacherId);
    }
  }

  addClassToTeacher(teacherId: string, className: string) {
    if (this.security.authenticated()) {
      this.db.list('teachers/' + teacherId + '/classes').push({
        name: className
      });
    }
  }

  removeClassFromTeacher(teacherId: string, classId: string) {
    if (this.security.authenticated()) {
      this.db.list('teachers/' + teacherId + '/classes').remove(classId).then(() => {
        this.removeUsersFromClass(classId);
      });

    }
  }

  addUserToClass(classId: string, userId: string) {
    if (this.security.authenticated()) {
      this.db.object('users/' + userId).update({
        classId: classId
      });
    }
  }

  removeUserFromClass(userId: string) {
    if (this.security.authenticated()) {
      this.db.object('users/' + userId + '/classId').remove();
    }
  }

  removeUsersFromClass(classId: string) {
    if (this.security.authenticated()) {
      this.getUsersFromClass(classId).pipe(
        first()
      ).subscribe(users => {
        users.forEach(user => {
          this.removeUserFromClass(user.id);
        });
      });
    }
  }

  getTeachers(): Observable<any> {
    return this.db.list('teachers', ref => ref.orderByChild('lastName')).snapshotChanges().pipe(
      map(teachers => teachers.map(teacher => ({id: teacher.key, ...teacher.payload.val()})))
    );
  }

  getClassesFromTeacher(teacherId: string): Observable<any> {
    return this.db.list('teachers/' + teacherId + '/classes').snapshotChanges().pipe(
      map(classes => classes.map(clazz => ({id: clazz.key, ...clazz.payload.val()})))
    );
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

  getUsersFromClass(classId: string): Observable<any> {
    return this.allUsers.pipe(
      map(users => users.filter(user => user.classId === classId))
    );
  }

  getStats(userId: string): Observable<any[]> {
    return this.db.list('userdata/' + userId).snapshotChanges().pipe(
      map(stats => stats.map(stat => ({...stat.payload.val()})))
    );
  }

  getMaxLevels(): Observable<any> {
    if (this.security.authenticated()) {
      let userId = this.security.currentUserId();
      return this.db.object('users/' + userId + '/maxLevels').valueChanges().pipe(first());
    } else {
      return of();
    }
  }
}
