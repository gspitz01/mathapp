import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionSubtractionComponent } from './fraction-subtraction.component';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FRACTION_SUBTRACTION } from '../fraction-operators';
import { MockAngularFireDataBase, MockAngularFireAuth } from '../test-constants';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

describe('FractionSubtractionComponent', () => {
  let component: FractionSubtractionComponent;
  let fixture: ComponentFixture<FractionSubtractionComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionSubtractionComponent,
        FractionQuizViewComponent,
        FractionExplanationViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionSubtractionComponent);
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

  it('should display "Easy Fraction Subtraction"', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain("Easy Fraction Subtraction");
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let operatorView = fixture.debugElement.query(By.css(".operator"));
      expect(operatorView.nativeElement.textContent).toBe(FRACTION_SUBTRACTION.display);
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
