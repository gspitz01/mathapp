import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { SimplifyFractionComponent } from './simplify-fraction.component';
import { StatsService } from '../../../core/services/stats.service';
import { SIMPLIFY_FRACTION } from '../../../core/domain/models/fractions/fraction-operators';
import { FractionResult } from '../../../core/domain/models/fractions/fraction-result';
import { SIMPLIFY_FRACTION_LEVEL_ORDER } from '../../../core/domain/models/fractions/simplify-fraction-round-levels';
import { BasicOperand } from 'src/app/core/domain/models/basics/basic-operand';
import { WRONG_ANSWER_TEXT, NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT,
  ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT } from 'src/app/core/domain/models/constants';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

function getTimeRemainingView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.time-remaining'));
}

function getCorrectAnswersView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.correct-answers'));
}

function getOperandNumeratorView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand-numerator'));
}

function getOperandDenominatorView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand-denominator'));
}

function getAnswerNumeratorInputView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css('#answer-num'));
}

function getAnswerDenominatorInputView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css('#answer-den'));
}

function getAnswer(fixture: ComponentFixture<SimplifyFractionComponent>): FractionResult {
  const operand1NumeratorView = getOperandNumeratorView(fixture);
      const operand1DenominatorView = getOperandDenominatorView(fixture);
      const opNum = parseInt(operand1NumeratorView.nativeElement.textContent, 10);
      const opDen = parseInt(operand1DenominatorView.nativeElement.textContent, 10);
      return SIMPLIFY_FRACTION.operation(new BasicOperand(opNum), new BasicOperand(opDen));
}

function setAnswer(fixture: ComponentFixture<SimplifyFractionComponent>, num: number, den: number) {
  const answerNumInput = getAnswerNumeratorInputView(fixture);
      const answerDenInput = getAnswerDenominatorInputView(fixture);
      answerNumInput.nativeElement.value = num;
      answerDenInput.nativeElement.value = den;
      answerNumInput.nativeElement.dispatchEvent(new Event('input'));
      answerDenInput.nativeElement.dispatchEvent(new Event('input'));
      answerDenInput.triggerEventHandler('keyup.enter', {});
}


describe('SimplifyFractionComponent', () => {
  let component: SimplifyFractionComponent;
  let fixture: ComponentFixture<SimplifyFractionComponent>;
  let startButton: DebugElement;
  let messagesView: DebugElement;
  const statsServiceSpy = jasmine.createSpyObj('StatsService', ['addStats', 'getMaxLevels']);
  // Need to start at lowest level for some tests so this needs to be a 0
  statsServiceSpy.getMaxLevels.and.returnValue(of({'simplify-fraction': 0}));
  statsServiceSpy.addStats.and.returnValue(of(true));
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  activatedRouteSpy.snapshot = {data: {}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplifyFractionComponent ],
      imports: [
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: StatsService, useValue: statsServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplifyFractionComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css('#start'));
    messagesView = fixture.debugElement.query(By.css('.messages'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('level order should be SIMPLIFY FRACTION', () => {
    expect(component.levelOrder).toBe(SIMPLIFY_FRACTION_LEVEL_ORDER);
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe('Start');
  });

  it('should display "Level: Twos"', () => {
    const levelDisplay = fixture.debugElement.query(By.css('.level'));
    expect(levelDisplay.nativeElement.textContent).toContain('Easy Simplify Fractions');
  });

  it('after start clicked, time should display', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      const timeRemainingView = fixture.debugElement.query(By.css('.time-remaining'));
      expect(timeRemainingView.nativeElement.textContent).toBe('60');
    });
  });

  it('click start changes it to stop', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      expect(startButton.nativeElement.textContent).toBe('Stop');
    });
  });

  it('after start pressed, should show question view for addition', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);
    });
  });

  it('after answer question correctly, should update views', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      const answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value, answer.denominator.value);

      fixture.detectChanges();
      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(1);
    });
  });

  it('after answer question incorrectly, should update views', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe('');

      const answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value + 1, answer.denominator.value);

      fixture.detectChanges();
      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);

      expect(messagesView.nativeElement.textContent).toBe(WRONG_ANSWER_TEXT);
    });
  });

  it('after answer question incorrectly, then correctly, wrong answer text goes away', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe('');

      const answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value + 1, answer.denominator.value);

      fixture.detectChanges();
      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);

      expect(messagesView.nativeElement.textContent).toBe(WRONG_ANSWER_TEXT);

      setAnswer(fixture, answer.numerator.value, answer.denominator.value);
      fixture.detectChanges();

      expect(correctAnswersView.nativeElement.textContent).toContain(1);
      expect(messagesView.nativeElement.textContent).toBe('');
    });
  });

  it('type in letters into numerator input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answerErrorMessage = fixture.debugElement.query(By.css('.answer-error'));
      expect(answerErrorMessage).toBeFalsy();

      const answerInput = getAnswerNumeratorInputView(fixture);
      answerInput.nativeElement.value = 'Some text';
      answerInput.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      answerErrorMessage = fixture.debugElement.query(By.css('.answer-error'));
      expect(answerErrorMessage.nativeElement.textContent).toContain('Answer must');
    });
  });

  it('type in letters into denominator input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answerErrorMessage = fixture.debugElement.query(By.css('.answer-error'));
      expect(answerErrorMessage).toBeFalsy();

      const answerInput = getAnswerDenominatorInputView(fixture);
      answerInput.nativeElement.value = 'Some text';
      answerInput.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      answerErrorMessage = fixture.debugElement.query(By.css('.answer-error'));
      expect(answerErrorMessage.nativeElement.textContent).toContain('Answer must');
    });
  });

  it('clock ticks correctly', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      jasmine.clock().tick(1001);
      fixture.detectChanges();

      expect(timeRemainingView.nativeElement.textContent).toBe('59');
      jasmine.clock().uninstall();
    });
  });

  it('let clock tick all the way down without answering, shows not enough questions answered message', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe('');

      jasmine.clock().tick(60001);
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('0');

      expect(messagesView.nativeElement.textContent).toBe(NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT);

      jasmine.clock().uninstall();
    });
  });

  it('let clock tick all the way down and answer enough questions correctly, shows next level message', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe('');

      const questionsNeeded = SIMPLIFY_FRACTION_LEVEL_ORDER[0].questionThresholdPerSixtySeconds;

      for (let i = 0; i < questionsNeeded; i++) {
        const answer = getAnswer(fixture);
        setAnswer(fixture, answer.numerator.value, answer.denominator.value);
        fixture.detectChanges();
      }

      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(questionsNeeded);

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      jasmine.clock().tick(60001);
      fixture.detectChanges();

      expect(timeRemainingView.nativeElement.textContent).toBe('0');
      expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });

  it('finish all levels, shows finished highest level message', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      const levelView = fixture.debugElement.query(By.css('.level'));
      const levelNamePrefixes = ['Easy', 'Medium', 'Challenging', 'Hard', 'Expert'];

      for (let level = 0; level < SIMPLIFY_FRACTION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levelNamePrefixes[level] + ' Simplify Fractions');
        expect(messagesView.nativeElement.textContent).toBe('');

        const questionsNeeded = SIMPLIFY_FRACTION_LEVEL_ORDER[level].questionThresholdPerSixtySeconds;

        for (let i = 0; i < questionsNeeded; i++) {
          const answer = getAnswer(fixture);
          setAnswer(fixture, answer.numerator.value, answer.denominator.value);
          fixture.detectChanges();
        }

        const correctAnswersView = getCorrectAnswersView(fixture);
        expect(correctAnswersView.nativeElement.textContent).toContain(questionsNeeded);

        const timeRemainingView = getTimeRemainingView(fixture);
        expect(timeRemainingView.nativeElement.textContent).toBe('60');

        jasmine.clock().tick(60001);
        fixture.detectChanges();

        expect(timeRemainingView.nativeElement.textContent).toBe('0');
        if (level < SIMPLIFY_FRACTION_LEVEL_ORDER.length - 1) {
          expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(FINISHED_HIGHEST_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });
});
