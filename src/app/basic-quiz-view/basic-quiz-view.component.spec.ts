import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicQuizViewComponent } from './basic-quiz-view.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Seconds } from '../seconds';

const defaultStartingTime = new Seconds(60);

describe('BasicQuizViewComponent', () => {
  let component: BasicQuizViewComponent;
  let fixture: ComponentFixture<BasicQuizViewComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicQuizViewComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicQuizViewComponent);
    component = fixture.componentInstance;
    component.startingTime = defaultStartingTime;
    component.startingLevel = 1;
    startButton = fixture.debugElement.query(By.css("#start"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('start button should display "Start"', () => {
    expect(startButton.nativeElement.textContent).toBe("Start");
  });

  it('click start changes it to stop', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      expect(startButton.nativeElement.textContent).toBe("Stop");
    });
  });
});
