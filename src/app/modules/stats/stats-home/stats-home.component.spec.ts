import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatListModule } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { of } from 'rxjs';

import { StatsHomeComponent } from './stats-home.component';
import { StatsClassComponent } from '../stats-class/stats-class.component';
import { StatsStudentComponent } from '../stats-student/stats-student.component';
import { StatsTeacherComponent } from '../stats-teacher/stats-teacher.component';
import { StatsUnassignedUsersComponent } from '../stats-unassigned-users/stats-unassigned-users.component';
import { StatsUserComponent } from '../stats-user/stats-user.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { CoreModule } from 'src/app/core/core.module';
import { MockAngularFireAuth, MockAngularFireDataBase, Spied } from 'src/app/core/domain/models/test-constants.spec';
import { User } from 'src/app/core/domain/models/user';
import { Teacher } from 'src/app/core/domain/models/teacher';
import { By } from '@angular/platform-browser';
import { Class } from 'src/app/core/domain/models/class';
import { Stats } from 'src/app/core/domain/models/stats';
import { DatePipe } from '@angular/common';

class DummyComponent {}

describe('StatsHomeComponent', () => {
  let component: StatsHomeComponent;
  let fixture: ComponentFixture<StatsHomeComponent>;
  let statsService: Spied<StatsService>;

  const unassignedUsers = [new User("userId03", "No Class User", "User", null)];
  const testUsers = [new User("userId01", "John Name", "Name", "class01"),
    new User("userId02", "Jane Doe", "Doe", "class02"),
    ...unassignedUsers];

  const testTeachers = [new Teacher("teacher01", "Teachy Teach", ["class01"])];
  const testClasses = [new Class("class01", "Algebra 1"), new Class("class02", "Geometry")];
  const testClassUsers = [testUsers[0]];
  const testStats = [new Stats(new Date(), new Date(), "Mathy Maths", 10, 4, null)];
  const usersObservable = of(testUsers);
  const teachersObservable = of(testTeachers);
  const classesObservable = of(testClasses);
  const classUsersObservable = of(testClassUsers);
  const statsObservable = of(testStats);

  function clickOnElementFromList(cssSelector: string, expectedLength: number) {
    const elementList = fixture.debugElement.queryAll(By.css(cssSelector));
    expect(elementList.length).toBe(expectedLength);
    elementList[0].query(By.css('a')).nativeElement.click();
    fixture.detectChanges();
  }

  function clickOnTeacher() {
    clickOnElementFromList('.teacher-list-item', testTeachers.length);
  }

  function clickOnClass() {
    clickOnElementFromList('.class-list-item', testClasses.length);
  }

  function clickOnUser() {
    clickOnElementFromList('.user-list-item', testClassUsers.length);
  }

  function clickAddClassButton() {
    fixture.debugElement.query(By.css('.add-class')).nativeElement.click();
    fixture.detectChanges();
  }

  function clickOnRemoveClassButton() {
    const classItems = fixture.debugElement.queryAll(By.css('.class-list-item'));
    expect(classItems.length).toBe(testClasses.length);
    classItems[0].query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
  }

  function clickAddStudentButton() {
    fixture.debugElement.query(By.css('.add-student')).nativeElement.click();
    fixture.detectChanges();
  }

  function clickRemoveStudentButton() {
    const userListItems = fixture.debugElement.queryAll(By.css('.user-list-item'));
    expect(userListItems.length).toBe(testClassUsers.length);
    userListItems[0].query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
  }

  function expectElementsContainInfo(cssSelector: string, comparisonArray: any[], containedInfoFromArray: string) {
    const elementList = fixture.debugElement.queryAll(By.css(cssSelector));
    expect(elementList.length).toBe(comparisonArray.length);
    for (let i = 0; i < comparisonArray.length; i++) {
      expect(elementList[i].nativeElement.textContent).toContain(comparisonArray[i][containedInfoFromArray]);
    }
  }

  beforeEach(async(() => {
    statsService = jasmine.createSpyObj('StatsService', ['getAllUsers', 'getTeachers',
      'getClassesFromTeacher', 'getUsersFromClass', 'getStats', 'addClassToTeacher',
      'removeClassFromTeacher', 'addUserToClass', 'removeUserFromClass']);
    statsService.getAllUsers.and.returnValue(usersObservable);
    statsService.getTeachers.and.returnValue(teachersObservable);
    statsService.getClassesFromTeacher.and.returnValue(classesObservable);
    statsService.getUsersFromClass.and.returnValue(classUsersObservable);
    statsService.getStats.and.returnValue(statsObservable);

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

  it('should get users from stats service', () => {
    expect(statsService.getAllUsers).toHaveBeenCalled();
    expect(component.users).toBe(usersObservable);
  });

  it('should get teachers from stats service', () => {
    expect(statsService.getTeachers).toHaveBeenCalled();
    expect(component.teachers).toBe(teachersObservable);
  });

  it('should contain and StatsTeacherComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-teacher')).not.toBeNull();
  });

  it('should not yet contain a StatsClassComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-class')).toBeNull();
  });

  it('should not yet contain a StatsStudentComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-student')).toBeNull();
  });

  it('should not yet contain a StatsUnassignedUsersComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-unassigned-users')).toBeNull();
  });

  it('should not yet contain a StatsUserComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).toBeNull();
  });

  it('should not yet contain adding class form', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.add-class-form')).toBeNull();
  });

  it('should display classes from teacher on click of teacher', () => {
    clickOnTeacher();

    expect(statsService.getClassesFromTeacher).toHaveBeenCalledWith(testTeachers[0].id);

    expectElementsContainInfo('.class-list-item', testClasses, 'name');
  });

  it('should display add class form on click add class button', () => {
    clickOnTeacher();
    clickAddClassButton();

    expect(fixture.debugElement.nativeElement.querySelector('.add-class-form')).not.toBeNull();
  });

  it('should add class to stats service on add class form submit', () => {
    clickOnTeacher();
    clickAddClassButton();

    const className = "New Class Name";
    const classNameInput = fixture.debugElement.query(By.css('.add-class-name')).nativeElement;
    classNameInput.value = className;
    classNameInput.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('.add-class-submit')).nativeElement.click();
    fixture.detectChanges();

    expect(statsService.addClassToTeacher).toHaveBeenCalledWith(testTeachers[0].id, className);
    expect(fixture.debugElement.nativeElement.querySelector('.add-class-form')).toBeNull();
  });

  it('should not add class if no class entered into input', () => {
    clickOnTeacher();
    clickAddClassButton();

    fixture.debugElement.query(By.css('.add-class-submit')).nativeElement.click();
    fixture.detectChanges();

    expect(statsService.addClassToTeacher).not.toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector('.add-class-form')).not.toBeNull();
  });

  it('should remove class from stats service if remove class clicked and confirmed', () => {
    clickOnTeacher();

    // Click yes on confirm box
    spyOn(window, 'confirm').and.returnValue(true);

    clickOnRemoveClassButton();

    expect(statsService.removeClassFromTeacher).toHaveBeenCalledWith(testTeachers[0].id, testClasses[0].id);
  });

  it('should not remove class from stats service if remove class clicked but no confirmed', () => {
    clickOnTeacher();

    // Click no on confirm box
    spyOn(window, 'confirm').and.returnValue(false);

    clickOnRemoveClassButton();

    expect(statsService.removeClassFromTeacher).not.toHaveBeenCalled();
  });

  it('should remove class user list if selected class removed', () => {
    clickOnTeacher();
    clickOnClass();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-student')).not.toBeNull();

    // Click yes on confirm box
    spyOn(window, 'confirm').and.returnValue(true);

    clickOnRemoveClassButton();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-student')).toBeNull();
  });

  it('should remove user stats if selected user from removed class', () => {
    clickOnTeacher();
    clickOnClass();
    clickOnUser();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).not.toBeNull();

    // Click yes on confirm box
    spyOn(window, 'confirm').and.returnValue(true);

    clickOnRemoveClassButton();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).toBeNull();
  });

  it('should display users from class on click of class', () => {
    clickOnTeacher();
    clickOnClass();

    expect(statsService.getUsersFromClass).toHaveBeenCalledWith(testClasses[0].id);

    expectElementsContainInfo('.user-list-item', testClassUsers, 'name');
  });

  it('should display unassigned users component if click on add user to class', () => {
    clickOnTeacher();
    clickOnClass();

    clickAddStudentButton();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-student')).toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-unassigned-users')).not.toBeNull();
  });

  it('should add user to class if click on user in unassigned users list', () => {
    clickOnTeacher();
    clickOnClass();
    clickAddStudentButton();

    const usersList = fixture.debugElement.queryAll(By.css('.user-list-item'));
    expect(usersList.length).toBe(unassignedUsers.length);
    usersList[0].query(By.css('a')).nativeElement.click();
    fixture.detectChanges();

    expect(statsService.addUserToClass).toHaveBeenCalledWith(testClasses[0].id, unassignedUsers[0].id);
  });

  it('should remove user from class on stats service if remove student clicked', () => {
    clickOnTeacher();
    clickOnClass();

    clickRemoveStudentButton();

    expect(statsService.removeUserFromClass).toHaveBeenCalledWith(testClassUsers[0].id);
  });

  it('should remove user stats if removed user selected', () => {
    clickOnTeacher();
    clickOnClass();
    clickOnUser();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).not.toBeNull();

    clickRemoveStudentButton();

    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).toBeNull();
  });

  it('should display user stats on user selected', () => {
    clickOnTeacher();
    clickOnClass();
    clickOnUser();

    expect(statsService.getStats).toHaveBeenCalledWith(testClassUsers[0].id);

    const statsElements = fixture.debugElement.queryAll(By.css('td'));
    expect(statsElements.length).toBe(testStats.length * 5);
    const pipe = new DatePipe('en');
    for (let i = 0; i < testStats.length; i++) {
      expect(statsElements[i * 5].nativeElement.textContent).toContain(testStats[i].roundName);
      expect(statsElements[i * 5 + 1].nativeElement.textContent).toContain(pipe.transform(testStats[i].roundStart, 'short'));
      expect(statsElements[i * 5 + 1].nativeElement.textContent).toContain(pipe.transform(testStats[i].roundEnd, 'short'));
      expect(statsElements[i * 5 + 2].nativeElement.textContent).toContain(testStats[i].target.toString());
      expect(statsElements[i * 5 + 3].nativeElement.textContent).toContain(testStats[i].correct.toString());
      if (testStats[i].incorrects == null) {
        expect(statsElements[i * 5 + 4].nativeElement.textContent).toContain("None Incorrect");
      } else {
        expect(statsElements[i * 5 + 4].nativeElement.textContent).toContain("Op1");
      }
    }
  });
});
