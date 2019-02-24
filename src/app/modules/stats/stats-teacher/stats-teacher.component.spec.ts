import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material';

import { StatsTeacherComponent } from './stats-teacher.component';
import { Teacher } from 'src/app/core/domain/models/teacher';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('StatsTeacherComponent', () => {
  let component: StatsTeacherComponent;
  let fixture: ComponentFixture<StatsTeacherComponent>;
  const testTeachers = [new Teacher("teacherId01", "Jill Maestra", ["class01", "class02"]),
    new Teacher("teacherId02", "John Prof", ["class04", "class06"])];
  const selectedTeacherId = testTeachers[0].id;
  let teachersListItems: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsTeacherComponent ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTeacherComponent);
    component = fixture.componentInstance;
    component.teachers = of(testTeachers);
    fixture.detectChanges();
    teachersListItems = fixture.debugElement.queryAll(By.css('.teacher-list-item'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show teachers', () => {
    expect(teachersListItems.length).toBe(testTeachers.length);
    expect(teachersListItems[0].nativeElement.textContent).toContain(testTeachers[0].name);
    expect(teachersListItems[1].nativeElement.textContent).toContain(testTeachers[1].name);
  });

  it('selected teacher has selected class attribute', () => {
    component.selectedTeacherId = selectedTeacherId;
    fixture.detectChanges();
    const teacherAnchor = teachersListItems[0].query(By.css('a'));
    expect(teacherAnchor.nativeElement.classList.contains('selected')).toBeTruthy();
  });

  it('click on teacher emits teacher selected event', () => {
    let teacherId: string;
    component.teacherSelected.subscribe(teacherIden => teacherId = teacherIden);
    teachersListItems[0].query(By.css('a')).nativeElement.click();
    expect(teacherId).toBe(testTeachers[0].id);
  });
});
