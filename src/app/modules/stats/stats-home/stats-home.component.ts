import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import { map, takeUntil, first } from 'rxjs/operators';

import { StatsService } from 'src/app/core/services/stats.service';
import { User } from 'src/app/core/domain/models/user';
import { Teacher } from 'src/app/core/domain/models/teacher';
import { Class } from 'src/app/core/domain/models/class';
import { Stats } from 'src/app/core/domain/models/stats';

@Component({
  selector: 'app-stats-home',
  templateUrl: './stats-home.component.html',
  styleUrls: ['./stats-home.component.scss']
})
export class StatsHomeComponent implements OnInit, OnDestroy {
  users: Observable<User[]>;
  unassignedUsers: Observable<User[]>;
  teachers: Observable<Teacher[]>;
  selectedTeacherId: string;
  teacherClasses: Observable<Class[]>;
  addingClass = false;
  selectedClassId: string;
  classStudents: Observable<User[]>;
  addingStudent = false;
  selectedUser: Observable<User>;
  userStats: Observable<Stats[]>;

  private readonly onDestroy = new Subject<void>();

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    // TODO: add authorization via StatsAuthGuard
    this.users = this.statsService.getAllUsers();
    this.unassignedUsers = this.users.pipe(
      map(users => users.filter(user => user.classId == null))
    );
    this.teachers = this.statsService.getTeachers();
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  onTeacherSelected(teacherId: string) {
    this.selectedTeacherId = teacherId;
    this.teacherClasses = this.statsService.getClassesFromTeacher(teacherId);
    this.selectedClassId = null;
    this.selectedUser = null;
    this.addingClass = false;
    this.addingStudent = false;
  }

  onAddClass() {
    this.addingClass = true;
  }

  onAddClassFormSubmit(className: string) {
    if (className) {
      if (this.selectedTeacherId) {
        this.statsService.addClassToTeacher(this.selectedTeacherId, className).pipe(
          first(),
          takeUntil(this.onDestroy)
        ).subscribe();
      }
      this.addingClass = false;
    }
  }

  onRemoveClass(clazz: Class) {
    if (this.selectedTeacherId && confirm('Are you sure you want to delete the class: ' + clazz.name + '?')) {
      this.statsService.removeClassFromTeacher(this.selectedTeacherId, clazz.id).pipe(
        first(),
        takeUntil(this.onDestroy)
      ).subscribe();
      if (this.selectedClassId === clazz.id) {
        this.selectedClassId = null;
      }

      if (this.selectedUser) {
        this.selectedUser.pipe(
          first()
        ).subscribe(user => {
          if (user.classId === clazz.id) {
            this.selectedUser = null;
          }
        });
      }
    }
  }

  onClassSelected(classId: string) {
    this.selectedClassId = classId;
    this.classStudents = this.statsService.getUsersFromClass(classId);
    this.addingStudent = false;
    this.selectedUser = null;
  }

  onAddStudent() {
    this.addingStudent = true;
  }

  onAddStudentToClass(studentId: string) {
    if (this.selectedClassId) {
      this.statsService.addUserToClass(this.selectedClassId, studentId).pipe(
        first(),
        takeUntil(this.onDestroy)
      ).subscribe();
    }
  }

  onRemoveStudent(student: User) {
    this.statsService.removeUserFromClass(student.id).pipe(
      first(),
      takeUntil(this.onDestroy)
    ).subscribe();
    if (this.selectedUser) {
      this.selectedUser.pipe(
        first()
      ).subscribe(user => {
        if (student.id === user.id) {
          this.selectedUser = null;
        }
      });
    }
  }

  onUserSelected(user: User) {
    this.selectedUser = of(user);
    this.userStats = this.statsService.getStats(user.id);
  }
}
