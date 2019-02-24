import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material';

import { StatsStudentComponent } from './stats-student.component';
import { User } from 'src/app/core/domain/models/user';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StatsStudentComponent', () => {
  let component: StatsStudentComponent;
  let fixture: ComponentFixture<StatsStudentComponent>;
  const testUsers = [new User("userId1", "John Billson", "Billson", "class01"),
    new User("userId2", "Erica Badu", "Badu", "classId02")];
  const selectedUser = testUsers[0];
  let usersListItems: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsStudentComponent ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsStudentComponent);
    component = fixture.componentInstance;
    component.students = of(testUsers);
    fixture.detectChanges();
    usersListItems = fixture.debugElement.queryAll(By.css('.user-list-item'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show students', () => {
    expect(usersListItems.length).toBe(testUsers.length);
    expect(usersListItems[0].nativeElement.textContent).toContain(testUsers[0].name);
    expect(usersListItems[1].nativeElement.textContent).toContain(testUsers[1].name);
  });

  it('selected class has selected class attribute', () => {
    component.selectedStudent = selectedUser;
    fixture.detectChanges();
    const selectedStudentAnchor = usersListItems[0].query(By.css('a'));
    expect(selectedStudentAnchor.nativeElement.classList.contains('selected')).toBeTruthy();
  });

  it('click on add student emits add student event', () => {
    let eventEmitted = false;
    component.addStudentClick.subscribe(() => eventEmitted = true);
    fixture.debugElement.query(By.css('.add-student')).nativeElement.click();
    expect(eventEmitted).toBeTruthy();
  });

  it('click on student emits student selected event', () => {
    let selectedStudent: User;
    component.studentSelected.subscribe(student => selectedStudent = student);
    usersListItems[0].query(By.css('a')).nativeElement.click();
    expect(selectedStudent).toBe(testUsers[0]);
  });

  it('click on student x emits remove student event', () => {
    let studentToRemove: User;
    component.removeStudentClick.subscribe(student => studentToRemove = student);
    usersListItems[0].query(By.css('button')).nativeElement.click();
    expect(studentToRemove).toBe(testUsers[0]);
  });
});
