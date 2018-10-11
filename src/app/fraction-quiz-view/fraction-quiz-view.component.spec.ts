import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionQuizViewComponent } from './fraction-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Seconds } from '../seconds';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FRACTION_ADDITION_LEVEL_ORDER } from '../round-levels';

describe('FractionQuizViewComponent', () => {
  let component: FractionQuizViewComponent;
  let fixture: ComponentFixture<FractionQuizViewComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionQuizViewComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionQuizViewComponent);
    component = fixture.componentInstance;
    component.startingTime = new Seconds(20);
    component.startingLevel = 1;
    component.levelOrder = FRACTION_ADDITION_LEVEL_ORDER;
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
