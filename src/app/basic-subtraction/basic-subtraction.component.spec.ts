import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSubtractionComponent } from './basic-subtraction.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SUBTRACTION } from '../basic-operators';

describe('BasicSubtractionComponent', () => {
  let component: BasicSubtractionComponent;
  let fixture: ComponentFixture<BasicSubtractionComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSubtractionComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSubtractionComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css("#start"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe("Start");
  });

  it('should display level 1', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain(1);
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let operatorView = fixture.debugElement.query(By.css(".operator"));
      expect(operatorView.nativeElement.textContent).toBe(SUBTRACTION.display);
    });
  });

  it('after start clicked, time should display', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let timeRemainingView = fixture.debugElement.query(By.css(".time-remaining"));
      expect(timeRemainingView.nativeElement.textContent).toBe('60');
    });
  });
});
