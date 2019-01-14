import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatListModule } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { StatsHomeComponent } from './stats-home.component';
import { MockAngularFireDataBase, MockAngularFireAuth } from 'src/app/shared/models/test-constants.spec';
import { StatsClassComponent } from '../stats-class/stats-class.component';
import { StatsStudentComponent } from '../stats-student/stats-student.component';
import { StatsTeacherComponent } from '../stats-teacher/stats-teacher.component';
import { StatsUnassignedUsersComponent } from '../stats-unassigned-users/stats-unassigned-users.component';
import { StatsUserComponent } from '../stats-user/stats-user.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';

class DummyComponent {}

describe('StatsHomeComponent', () => {
  let component: StatsHomeComponent;
  let fixture: ComponentFixture<StatsHomeComponent>;
  const statsService = jasmine.createSpyObj('StatsService', ['getAllUsers', 'getTeachers']);
  const usersObservable = of();
  statsService.getAllUsers.and.returnValue(usersObservable);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatsHomeComponent,
        StatsClassComponent,
        StatsStudentComponent,
        StatsTeacherComponent,
        StatsUnassignedUsersComponent,
        StatsUserComponent
      ],
      imports: [
        MatListModule,
        RouterTestingModule.withRoutes([
          { path: 'stats/1', component: DummyComponent }
        ]),
        CoreModule
      ],
      providers: [
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: StatsService, useValue: statsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
