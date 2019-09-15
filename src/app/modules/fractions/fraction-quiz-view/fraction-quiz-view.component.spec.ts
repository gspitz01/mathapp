import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { FractionQuizViewComponent } from './fraction-quiz-view.component';
import { FRACTION_ADDITION_LEVEL_ORDER } from '../../../core/domain/models/fractions/fraction-round-levels';
import { FRACTION_ADDITION } from '../../../core/domain/models/fractions/fraction-operators';
import { FractionOperand } from '../../../core/domain/models/fractions/fraction-operand';
import { FractionResult } from '../../../core/domain/models/fractions/fraction-result';
import { StatsService } from '../../../core/services/stats.service';
import { BasicOperand } from 'src/app/core/domain/models/basics/basic-operand';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FractionTimedQuiz } from 'src/app/core/domain/models/fractions/fraction-timed-quiz';
import { DisplayText } from 'src/app/core/domain/models/display-text';

function getTimeRemainingView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.time-remaining'));
}

function getCorrectAnswersView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.correct-answers'));
}

function getOperand1NumeratorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand1-numerator'));
}

function getOperand1DenominatorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand1-denominator'));
}

function getOperand2NumeratorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand2-numerator'));
}

function getOperand2DenominatorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand2-denominator'));
}

function getAnswerNumeratorInputView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('#answer-num'));
}

function getAnswerDenominatorInputView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('#answer-den'));
}

function getStartButton(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('#start'));
}

function getMessagesView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.messages'));
}

function getAnswer(fixture: ComponentFixture<FractionQuizViewComponent>): FractionResult {
  const operand1NumeratorView = getOperand1NumeratorView(fixture);
  const operand1DenominatorView = getOperand1DenominatorView(fixture);
  const operand2NumeratorView = getOperand2NumeratorView(fixture);
  const operand2DenominatorView = getOperand2DenominatorView(fixture);
  const op1Num = parseInt(operand1NumeratorView.nativeElement.textContent, 10);
  const op1Den = parseInt(operand1DenominatorView.nativeElement.textContent, 10);
  const op2Num = parseInt(operand2NumeratorView.nativeElement.textContent, 10);
  const op2Den = parseInt(operand2DenominatorView.nativeElement.textContent, 10);

  const fractionOperand1 = new FractionOperand(new BasicOperand(op1Num), new BasicOperand(op1Den));
  const fractionOperand2 = new FractionOperand(new BasicOperand(op2Num), new BasicOperand(op2Den));
  return FRACTION_ADDITION.operation(fractionOperand1, fractionOperand2);
}

function setAnswer(fixture: ComponentFixture<FractionQuizViewComponent>, num: number, den: number) {
  const answerNumInput = getAnswerNumeratorInputView(fixture);
  const answerDenInput = getAnswerDenominatorInputView(fixture);
  answerNumInput.nativeElement.value = num;
  answerDenInput.nativeElement.value = den;
  answerNumInput.nativeElement.dispatchEvent(new Event('input'));
  answerDenInput.nativeElement.dispatchEvent(new Event('input'));
  answerDenInput.triggerEventHandler('keyup.enter', {});
}


describe('FractionQuizViewComponent', () => {
  let component: FractionQuizViewComponent;
  let fixture: ComponentFixture<FractionQuizViewComponent>;
  let startButton: DebugElement;
  let messagesView: DebugElement;
  const statsServiceSpy = jasmine.createSpyObj('StatsService', ['addStats', 'getMaxLevels']);
  statsServiceSpy.getMaxLevels.and.returnValue(of({'fraction-addition': 4}));
  statsServiceSpy.addStats.and.returnValue(of(true));

  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  activatedRouteSpy.snapshot = {
    data: {
      startingLevel: 1,
      startingTime: 60,
      levelOrder: FRACTION_ADDITION_LEVEL_ORDER,
      quizName: 'easy-fraction-addition',
      title: 'Fraction Addition'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionQuizViewComponent ],
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
    fixture = TestBed.createComponent(FractionQuizViewComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css('#start'));
    messagesView = fixture.debugElement.query(By.css('.messages'));
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('start button should display "Start"', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      expect(startButton.nativeElement.textContent).toBe('Start');
    });
  });

  it('click start changes it to stop', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();
      expect(startButton.nativeElement.textContent).toBe('Stop');
    });
  });

  it('after start pressed, should show question view for addition', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      const operatorView = fixture.debugElement.query(By.css('.operator'));
      expect(operatorView.nativeElement.textContent).toBe(FRACTION_ADDITION.display);

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);
    });
  });

  it('after answer question correctly, should update views', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
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
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = getMessagesView(fixture);
      expect(messagesView.nativeElement.textContent).toBe('');

      const answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value + 1, answer.denominator.value);

      fixture.detectChanges();
      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.WRONG_ANSWER_TEXT);
    });
  });

  it('after answer question incorrectly, then correctly, wrong answer text goes away', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = getMessagesView(fixture);
      expect(messagesView.nativeElement.textContent).toBe('');

      const answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value + 1, answer.denominator.value);

      fixture.detectChanges();
      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.WRONG_ANSWER_TEXT);

      setAnswer(fixture, answer.numerator.value, answer.denominator.value);
      fixture.detectChanges();

      expect(correctAnswersView.nativeElement.textContent).toContain(1);
      expect(messagesView.nativeElement.textContent).toBe(DisplayText.CORRECT_ANSWER_TEXT);
    });
  });

  it('type in letters into numerator input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
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
      startButton = getStartButton(fixture);
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

  it('should answer */* if "Skip" clicked', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      spyOn(component.quiz, 'answerQuestion');

      const skipButton = fixture.debugElement.query(By.css('#skip'));
      skipButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.quiz.answerQuestion).toHaveBeenCalledWith('*' + FractionTimedQuiz.ANSWER_DELIMITER + '*');
    });
  });

  it('clock ticks correctly', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      jasmine.clock().tick(1001);
      fixture.detectChanges();

      expect(timeRemainingView.nativeElement.textContent).toBe('59');
    });
  });

  it('let clock tick all the way down without answering, shows not enough questions answered message', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = getMessagesView(fixture);
      expect(messagesView.nativeElement.textContent).toBe('');

      jasmine.clock().tick(60001);
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('0');
      expect(messagesView.nativeElement.textContent).toBe(DisplayText.NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT);
    });
  });

  it('let clock tick all the way down and answer enough questions correctly, shows next level message', () => {
    fixture.whenStable().then(() => {
      startButton = getStartButton(fixture);
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = getMessagesView(fixture);
      expect(messagesView.nativeElement.textContent).toBe('');

      const questionsNeeded = FRACTION_ADDITION_LEVEL_ORDER[1].questionThresholdPerSixtySeconds;

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
      expect(messagesView.nativeElement.textContent).toBe(DisplayText.ADVANCE_TO_NEXT_LEVEL_TEXT);
    });
  });

  it('finish all levels, shows finished highest level message', () => {
    fixture.whenStable().then(() => {
      const levelView = fixture.debugElement.query(By.css('.level'));
      const levelNamePrefixes = ['Easy', 'Medium', 'Challenging', 'Hard', 'Expert'];
      startButton = getStartButton(fixture);
      messagesView = getMessagesView(fixture);
      for (let level = 1; level < FRACTION_ADDITION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levelNamePrefixes[level] + ' Fraction Addition');
        expect(messagesView.nativeElement.textContent).toBe('');

        const questionsNeeded = FRACTION_ADDITION_LEVEL_ORDER[level].questionThresholdPerSixtySeconds;

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
        if (level < FRACTION_ADDITION_LEVEL_ORDER.length - 1) {
          expect(messagesView.nativeElement.textContent).toBe(DisplayText.ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.FINISHED_HIGHEST_LEVEL_TEXT);
    });
  });
});
