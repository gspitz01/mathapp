import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { BasicQuizViewComponent } from './basic-quiz-view.component';
import { StatsService } from '../../../core/services/stats.service';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { BASIC_ADDITION_LEVEL_ORDER } from 'src/app/core/domain/models/round-levels';
import { ADDITION } from 'src/app/core/domain/models/basics/basic-operators';
import { WRONG_ANSWER_TEXT, NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT,
  ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT } from 'src/app/core/domain/models/constants';

const defaultStartingTime = new Seconds(60);

function getTimeRemainingView(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.time-remaining'));
}

function getCorrectAnswersView(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.correct-answers'));
}

function getOperand1View(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand1'));
}

function getOperand2View(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('.operand2'));
}

function getAnswerInputView(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css('#answer'));
}

describe('BasicQuizViewComponent', () => {
  let component: BasicQuizViewComponent;
  let fixture: ComponentFixture<BasicQuizViewComponent>;
  let startButton: DebugElement;
  let messagesView: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicQuizViewComponent ],
      imports: [
        FormsModule,
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
    fixture = TestBed.createComponent(BasicQuizViewComponent);
    component = fixture.componentInstance;
    component.startingTime = defaultStartingTime;
    component.startingLevel = 1;
    component.levelOrder = BASIC_ADDITION_LEVEL_ORDER;
    startButton = fixture.debugElement.query(By.css('#start'));
    messagesView = fixture.debugElement.query(By.css('.messages'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('start button should display "Start"', () => {
    expect(startButton.nativeElement.textContent).toBe('Start');
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

      const operatorView = fixture.debugElement.query(By.css('.operator'));
      expect(operatorView.nativeElement.textContent).toBe(ADDITION.display);

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

      const operand1View = getOperand1View(fixture);
      const operand2View = getOperand2View(fixture);
      const op1 = parseInt(operand1View.nativeElement.textContent, 10);
      const op2 = parseInt(operand2View.nativeElement.textContent, 10);

      const answerInput = getAnswerInputView(fixture);
      answerInput.nativeElement.value = op1 + op2;
      answerInput.nativeElement.dispatchEvent(new Event('input'));
      answerInput.triggerEventHandler('keyup.enter', {});

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

      const operand1View = getOperand1View(fixture);
      const operand2View = getOperand2View(fixture);
      const op1 = parseInt(operand1View.nativeElement.textContent, 10);
      const op2 = parseInt(operand2View.nativeElement.textContent, 10);

      const answerInput = getAnswerInputView(fixture);
      answerInput.nativeElement.value = op1 + op2 + 4;
      answerInput.nativeElement.dispatchEvent(new Event('input'));
      answerInput.triggerEventHandler('keyup.enter', {});

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

      const operand1View = getOperand1View(fixture);
      const operand2View = getOperand2View(fixture);
      const op1 = parseInt(operand1View.nativeElement.textContent, 10);
      const op2 = parseInt(operand2View.nativeElement.textContent, 10);

      const answerInput = getAnswerInputView(fixture);
      answerInput.nativeElement.value = op1 + op2 + 4;
      answerInput.nativeElement.dispatchEvent(new Event('input'));
      answerInput.triggerEventHandler('keyup.enter', {});

      fixture.detectChanges();
      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);

      expect(messagesView.nativeElement.textContent).toBe(WRONG_ANSWER_TEXT);

      answerInput.nativeElement.value = op1 + op2;
      answerInput.nativeElement.dispatchEvent(new Event('input'));
      answerInput.triggerEventHandler('keyup.enter', {});

      fixture.detectChanges();
      expect(correctAnswersView.nativeElement.textContent).toContain(1);

      expect(messagesView.nativeElement.textContent).toBe('');
    });
  });

  it('type in letters into input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answerErrorMessage = fixture.debugElement.query(By.css('.answer-error'));
      expect(answerErrorMessage).toBeFalsy();

      const answerInput = getAnswerInputView(fixture);
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

      const operand1View = getOperand1View(fixture);
      const operand2View = getOperand2View(fixture);
      const answerInput = getAnswerInputView(fixture);
      const questionsNeeded = BASIC_ADDITION_LEVEL_ORDER[1].questionThresholdPerSixtySeconds;

      for (let i = 0; i < questionsNeeded; i++) {
        const op1 = parseInt(operand1View.nativeElement.textContent, 10);
        const op2 = parseInt(operand2View.nativeElement.textContent, 10);
        answerInput.nativeElement.value = op1 + op2;
        answerInput.nativeElement.dispatchEvent(new Event('input'));
        answerInput.triggerEventHandler('keyup.enter', {});
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

      const targetView = fixture.debugElement.query(By.css('.target'));
      const targets = [25, 20, 15, 8, 5];

      for (let level = 1; level < BASIC_ADDITION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levelNamePrefixes[level] + ' ' + 'Addition');
        expect(targetView.nativeElement.textContent).toContain(targets[level]);
        expect(messagesView.nativeElement.textContent).toBe('');

        const operand1View = getOperand1View(fixture);
        const operand2View = getOperand2View(fixture);
        const answerInputView = getAnswerInputView(fixture);
        const questionsNeeded = BASIC_ADDITION_LEVEL_ORDER[level].questionThresholdPerSixtySeconds;

        for (let i = 0; i < questionsNeeded; i++) {
          const op1 = parseInt(operand1View.nativeElement.textContent, 10);
          const op2 = parseInt(operand2View.nativeElement.textContent, 10);
          answerInputView.nativeElement.value = op1 + op2;
          answerInputView.nativeElement.dispatchEvent(new Event('input'));
          answerInputView.triggerEventHandler('keyup.enter', {});
          fixture.detectChanges();
        }

        const correctAnswersView = getCorrectAnswersView(fixture);
        expect(correctAnswersView.nativeElement.textContent).toContain(questionsNeeded);

        const timeRemainingView = getTimeRemainingView(fixture);
        expect(timeRemainingView.nativeElement.textContent).toBe('60');

        jasmine.clock().tick(60001);
        fixture.detectChanges();

        expect(timeRemainingView.nativeElement.textContent).toBe('0');
        if (level < BASIC_ADDITION_LEVEL_ORDER.length - 1) {
          expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(FINISHED_HIGHEST_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });
});
