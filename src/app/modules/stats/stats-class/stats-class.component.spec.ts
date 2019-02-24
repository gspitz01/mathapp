import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { MatListModule } from '@angular/material';

import { StatsClassComponent } from './stats-class.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Class } from 'src/app/core/domain/models/class';

describe('StatsClassComponent', () => {
  let component: StatsClassComponent;
  let fixture: ComponentFixture<StatsClassComponent>
  const testClasses = [new Class("class01", "Algebra 1"), new Class("class02", "Algebra 2")];
  const classId = testClasses[0].id;
  let classesListItems: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsClassComponent ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsClassComponent);
    component = fixture.componentInstance;
    component.classes = of(testClasses);
    fixture.detectChanges();
    classesListItems = fixture.debugElement.queryAll(By.css('.class-list-item'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show classes', () => {
    expect(classesListItems.length).toBe(testClasses.length);
    expect(classesListItems[0].nativeElement.textContent).toContain(testClasses[0].name);
    expect(classesListItems[1].nativeElement.textContent).toContain(testClasses[1].name);
  });

  it('selected class has selected class attribute', () => {
    component.selectedClassId = classId;
    fixture.detectChanges();
    const selectedClassAnchor = classesListItems[0].query(By.css('a'));
    expect(selectedClassAnchor.nativeElement.classList.contains("selected")).toBeTruthy();
  });

  it('click on class emits selected class event', () => {
    let selectedClassId: string;
    component.classSelected.subscribe(classId => selectedClassId = classId);
    const classAnchor = classesListItems[0].query(By.css('a'));
    classAnchor.nativeElement.click();
    expect(selectedClassId).toBe(testClasses[0].id);
  });

  it('click on x next to class emits remove class event', () => {
    let classToRemove: Class;
    component.removeClassClick.subscribe(clazz => classToRemove = clazz);
    const classX = classesListItems[0].query(By.css('button'));
    classX.nativeElement.click();
    expect(classToRemove).toBe(testClasses[0]);
  });

  it('add class click emits add class event', () => {
    let eventEmitted = false;
    component.addClassClick.subscribe(() => eventEmitted = true);
    fixture.debugElement.query(By.css('.add-class')).nativeElement.click();
    expect(eventEmitted).toBeTruthy();
  });
});
