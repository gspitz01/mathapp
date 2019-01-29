import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { FractionAdditionComponent } from './fraction-addition.component';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { FRACTION_ADDITION } from '../../../core/domain/models/fractions/fraction-operators';
import { StatsService } from 'src/app/core/services/stats.service';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';

describe('FractionAdditionComponent', () => {
  let component: FractionAdditionComponent;
  let fixture: ComponentFixture<FractionAdditionComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionAdditionComponent,
        FractionQuizViewComponent,
        FractionExplanationViewComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: StatsService, useClass: MockStatsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionAdditionComponent);
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

  it('should display "Easy Fraction Addition"', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain("Easy Fraction Addition");
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let operatorView = fixture.debugElement.query(By.css(".operator"));
      expect(operatorView.nativeElement.textContent).toBe(FRACTION_ADDITION.display);
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
