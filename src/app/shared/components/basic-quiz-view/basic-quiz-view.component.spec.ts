import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { BasicQuizViewComponent } from './basic-quiz-view.component';
import { StatsService } from '../../../core/services/stats.service';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { ADDITION } from 'src/app/core/domain/models/basics/basic-operators';
import { compileComponentFromMetadata } from '@angular/compiler';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BASIC_ADDITION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-addition-round-levels';
import { DisplayText } from 'src/app/core/domain/models/display-text';

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
  const mockStatsService = jasmine.createSpyObj('StatsService', ['getMaxLevels', 'addStats']);
  const maxLevelsObj = jasmine.createSpyObj('MaxLevels', ['subscribe', 'pipe']);
  const quizName = 'Basics';
  const maxLevels = {};
  const maxLevel = 5;
  maxLevels[quizName] = maxLevel;
  mockStatsService.getMaxLevels.and.returnValue(maxLevelsObj);
  mockStatsService.addStats.and.returnValue(of(true));
  maxLevelsObj.pipe.and.returnValue(maxLevelsObj);
  maxLevelsObj.subscribe.and.callFake((func) => {
    func(maxLevels);
  });

  const mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['get']);
  mockActivatedRoute.snapshot = {
    params: {

    },
    data: {
      startingLevel: 1,
      startingTime: 60,
      levelOrder: BASIC_ADDITION_LEVEL_ORDER,
      quizName: 'Easy Addition',
      title: 'Addition'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicQuizViewComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: StatsService, useValue: mockStatsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicQuizViewComponent);
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

  it('start button should display "Start"', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      expect(startButton.nativeElement.textContent).toBe('Start');
      done();
    });
  });

  it('should subscribe to maxLevels on statsService', () => {
    expect(mockStatsService.getMaxLevels).toHaveBeenCalled();
    expect(maxLevelsObj.subscribe).toHaveBeenCalled();
  });

  it('click start changes it to stop', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();
      expect(startButton.nativeElement.textContent).toBe('Stop');
      done();
    });
  });

  it('should stop timer if start pressed twice', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      expect(component.quiz.isTimerRunning()).toBeTruthy();
      startButton.nativeElement.click();
      expect(component.quiz.isTimerRunning()).toBeFalsy();
      expect(startButton.nativeElement.textContent).toBe('Start');
      done();
    });
  });

  it('after start pressed, should show question view for addition', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      const operatorView = fixture.debugElement.query(By.css('.operator'));
      expect(operatorView.nativeElement.textContent).toBe(ADDITION.display);

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      const correctAnswersView = getCorrectAnswersView(fixture);
      expect(correctAnswersView.nativeElement.textContent).toContain(0);
      done();
    });
  });

  it('after answer question correctly, should update views', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
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
      done();
    });
  });

  it('after answer question incorrectly, should update views', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = fixture.debugElement.query(By.css('.messages'));
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

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.WRONG_ANSWER_TEXT);
      done();
    });
  });

  it('after answer question incorrectly, then correctly, wrong answer text goes away', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = fixture.debugElement.query(By.css('.messages'));
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

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.WRONG_ANSWER_TEXT);

      answerInput.nativeElement.value = op1 + op2;
      answerInput.nativeElement.dispatchEvent(new Event('input'));
      answerInput.triggerEventHandler('keyup.enter', {});

      fixture.detectChanges();
      expect(correctAnswersView.nativeElement.textContent).toContain(1);

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.CORRECT_ANSWER_TEXT);
      done();
    });
  });

  it('type in letters into input, shows error message', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
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
      done();
    });
  });

  it('should skip question when "Skip" clicked', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      spyOn(component.quiz, 'skipQuestion');

      const skipButton = fixture.debugElement.query(By.css('#skip'));
      skipButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.quiz.skipQuestion).toHaveBeenCalled();
      done();
    });
  });

  it('clock ticks correctly', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      jasmine.clock().tick(1001);
      fixture.detectChanges();

      expect(timeRemainingView.nativeElement.textContent).toBe('59');
      done();
    });
  });

  it('let clock tick all the way down without answering, shows not enough questions answered message', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = fixture.debugElement.query(By.css('.messages'));
      expect(messagesView.nativeElement.textContent).toBe('');

      jasmine.clock().tick(60001);
      fixture.detectChanges();

      const timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('0');

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT);
      done();
    });
  });

  it('let clock tick all the way down and answer enough questions correctly, shows next level message', (done) => {
    fixture.whenStable().then(() => {
      startButton = fixture.debugElement.query(By.css('#start'));
      startButton.nativeElement.click();
      fixture.detectChanges();

      messagesView = fixture.debugElement.query(By.css('.messages'));
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
      expect(messagesView.nativeElement.textContent).toBe(DisplayText.ADVANCE_TO_NEXT_LEVEL_TEXT);
      done();
    });
  });

  it('finish all levels, shows finished highest level message', (done) => {
    fixture.whenStable().then(() => {
      const levelView = fixture.debugElement.query(By.css('.level'));
      const levels = BASIC_ADDITION_LEVEL_ORDER.map<string>((value) => value.name);

      const targetView = fixture.debugElement.query(By.css('.target'));
      const targets = BASIC_ADDITION_LEVEL_ORDER.map<number>((value) => value.questionThresholdPerSixtySeconds);

      startButton = fixture.debugElement.query(By.css('#start'));
      messagesView = fixture.debugElement.query(By.css('.messages'));

      for (let level = 1; level < BASIC_ADDITION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levels[level]);
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
          expect(messagesView.nativeElement.textContent).toBe(DisplayText.ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(DisplayText.FINISHED_HIGHEST_LEVEL_TEXT);
      done();
    });
  });
});
