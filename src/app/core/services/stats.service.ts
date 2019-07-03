import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable, EMPTY, zip, combineLatest, forkJoin, iif, of, from } from 'rxjs';
import { map, first, switchMap, catchError, mapTo, mergeMap } from 'rxjs/operators';

import { SecurityService } from './security.service';
import { Stats } from '../domain/models/stats';
import { User } from '../domain/models/user';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  // TODO: !IMPORTANT! add error handling and logging

  private allUsers: Observable<any[]>;
  private admin: Observable<boolean>;

  constructor(private db: AngularFireDatabase,
    private security: SecurityService) {
      this.allUsers = this.db.list('users', ref => ref.orderByChild('lastName')).snapshotChanges().pipe(
        map(users => users.map(user => ({ id: user.key, ...user.payload.val() })))
      );
      this.admin = zip(this.security.getAuthState(), this.getAdminSnapshot())
      .pipe(
        map(([authState, admin]) => {
          if (authState && admin && admin.key === authState.uid) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  isAdmin(): Observable<boolean> {
    return this.admin;
  }

  addStats(stats: Stats, maxLevels: Object): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return zip(this.security.currentUserId(), this.security.currentUserDisplayName())
          .pipe(
            first(),
            switchMap(([userId, displayName]) => {
              const splitName = displayName.split(' ');
              return forkJoin([
                this.db.object('users/' + userId).update({
                name: displayName,
                lastName: splitName[splitName.length - 1]
              }), this.db.list('userdata/' + userId).push({
                startDate: stats.roundStart.getTime(),
                endDate: stats.roundEnd.getTime(),
                name: stats.roundName,
                target: stats.target,
                correct: stats.correct,
                incorrects: stats.incorrects
              }),
              iif(() => maxLevels != null,
                this.db.object('users/' + userId + '/maxLevels').update(maxLevels), of(false))]);
            }),
            map(() => {
              return true;
            }),
            catchError(error => {
              // TODO: add logging here
              return of(false);
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }

  addTeacher(teacher: User): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return from(this.db.object('teachers/' + teacher.id).set({
            name: teacher.name
          })).pipe(
            map(() => true),
            catchError(error => of(false))
          );
        } else {
          return of(false);
        }
      })
    );
  }

  removeTeacher(teacherId: string): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return from(this.db.list('teachers').remove(teacherId)).pipe(
            map(() => true),
            catchError(error => of(false))
          );
        } else {
          return of(false);
        }
      })
    );
  }

  addClassToTeacher(teacherId: string, className: string): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return from(this.db.list('teachers/' + teacherId + '/classes').push({
            name: className
          })).pipe(
            map(() => true),
            catchError(error => of(false))
          );
        } else {
          return of(false);
        }
      })
    );
  }

  removeClassFromTeacher(teacherId: string, classId: string): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return from(this.db.list('teachers/' + teacherId + '/classes').remove(classId)).pipe(
            switchMap((value: void, index: number) => {
              return this.removeUsersFromClass(classId);
            }),
            map((success: boolean, index: number) => success),
            catchError(error => {
              return of(false);
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }

  addUserToClass(classId: string, userId: string): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return from( this.db.object('users/' + userId).update({
            classId: classId
          })).pipe(
            map(() => true),
            catchError(error => of(false))
          );
        } else {
          return of(false);
        }
      })
    );
  }

  removeUserFromClass(userId: string): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return from(this.db.object('users/' + userId + '/classId').remove()).pipe(
            map(() => true),
            catchError(error => of(false))
          );
        } else {
          return of(false);
        }
      })
    );
  }

  removeUsersFromClass(classId: string): Observable<boolean> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap((loggedIn: boolean, index: number) => {
        if (loggedIn) {
          return this.getUsersFromClass(classId).pipe(
            first(),
            switchMap((users: User[]) => {
              return of(users).pipe(
                mergeMap((userz: User[]) => {
                  return forkJoin(...userz.map(user => {
                    return from(this.removeUserFromClass(user.id));
                  }));
                })
              );
            }),
            map(() => true),
            catchError(error => {
              return of(false);
            })
          );
        } else {
          return of(false);
        }
      })
    );
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
    return this.security.loggedIn().pipe(
      first(),
      map(loggedIn => {
        if (loggedIn) {
          return this.getAdminSnapshot();
        } else {
          return EMPTY;
        }
      })
    );
  }

  getAdminSnapshot(): Observable<any> {
    return this.security.currentUserId().pipe(
      first(),
      switchMap(userId => {
        return this.db.object('admins/' + userId).snapshotChanges();
      })
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.allUsers;
  }

  getUsersFromClass(classId: string): Observable<any> {
    return this.allUsers.pipe(
      map(users => users.filter(user => user.classId === classId))
    );
  }

  getStats(userId: string): Observable<Stats[]> {
    return this.db.list('userdata/' + userId).snapshotChanges().pipe(
      map(stats => stats.map(stat => {
        const val: any = stat.payload.val();
        return new Stats(val.startDate, val.endDate, val.name, val.target, val.correct, val.incorrects);
      }))
    );
  }

  getMaxLevels(): Observable<any> {
    return this.security.loggedIn().pipe(
      first(),
      switchMap(loggedIn => {
        if (loggedIn) {
          return this.security.currentUserId().pipe(
            first(),
            switchMap(userId => {
              return this.db.object('users/' + userId + '/maxLevels').valueChanges().pipe(first());
            })
          );
        } else {
          return EMPTY;
        }
      })
    );
  }
}
