import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { FractionQuizViewComponent } from './fraction-quiz-view.component';
import { Seconds } from '../seconds';
import { FRACTION_ADDITION_LEVEL_ORDER } from '../round-levels';
import { FRACTION_ADDITION } from '../fraction-operators';
import { NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT, WRONG_ANSWER_TEXT } from '../constants';
import { FractionOperand } from '../fraction-operand';
import { BasicOperand } from '../basic-operand';
import { FractionResult } from '../fraction-result';
import { StatsService } from '../stats.service';
import { MockStatsService } from '../test-constants';

function getTimeRemainingView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".time-remaining"));
}

function getQuestionsAnsweredView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".questions-answered"));
}

function getOperand1NumeratorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand1-numerator"));
}

function getOperand1DenominatorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand1-denominator"));
}

function getOperand2NumeratorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand2-numerator"));
}

function getOperand2DenominatorView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand2-denominator"));
}

function getAnswerNumeratorInputView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css("#answer-num"));
}

function getAnswerDenominatorInputView(fixture: ComponentFixture<FractionQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css("#answer-den"));
}

function getAnswer(fixture: ComponentFixture<FractionQuizViewComponent>): FractionResult {
  let operand1NumeratorView = getOperand1NumeratorView(fixture);
      let operand1DenominatorView = getOperand1DenominatorView(fixture);
      let operand2NumeratorView = getOperand2NumeratorView(fixture);
      let operand2DenominatorView = getOperand2DenominatorView(fixture);
      let op1Num = parseInt(operand1NumeratorView.nativeElement.textContent);
      let op1Den = parseInt(operand1DenominatorView.nativeElement.textContent);
      let op2Num = parseInt(operand2NumeratorView.nativeElement.textContent);
      let op2Den = parseInt(operand2DenominatorView.nativeElement.textContent);

      let fractionOperand1 = new FractionOperand(new BasicOperand(op1Num), new BasicOperand(op1Den));
      let fractionOperand2 = new FractionOperand(new BasicOperand(op2Num), new BasicOperand(op2Den));
      return FRACTION_ADDITION.operation(fractionOperand1, fractionOperand2);
}

function setAnswer(fixture: ComponentFixture<FractionQuizViewComponent>, num: number, den: number) {
  let answerNumInput = getAnswerNumeratorInputView(fixture);
      let answerDenInput = getAnswerDenominatorInputView(fixture);
      answerNumInput.nativeElement.value = num;
      answerDenInput.nativeElement.value = den;
      answerNumInput.nativeElement.dispatchEvent(new Event("input"));
      answerDenInput.nativeElement.dispatchEvent(new Event("input"));
      answerDenInput.triggerEventHandler('keyup.enter', {});
}


describe('FractionQuizViewComponent', () => {
  let component: FractionQuizViewComponent;
  let fixture: ComponentFixture<FractionQuizViewComponent>;
  let startButton: DebugElement;
  let messagesView: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionQuizViewComponent ],
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
    fixture = TestBed.createComponent(FractionQuizViewComponent);
    component = fixture.componentInstance;
    component.startingTime = new Seconds(60);
    component.startingLevel = 1;
    component.levelOrder = FRACTION_ADDITION_LEVEL_ORDER;
    startButton = fixture.debugElement.query(By.css("#start"));
    messagesView = fixture.debugElement.query(By.css(".messages"));
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

  it('after start pressed, should show question view for addition', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let operatorView = fixture.debugElement.query(By.css(".operator"));
      expect(operatorView.nativeElement.textContent).toBe(FRACTION_ADDITION.display);

      let timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe('60');

      let questionsAnsweredView = getQuestionsAnsweredView(fixture);
      expect(questionsAnsweredView.nativeElement.textContent).toContain(0);
    });
  });

  it('after answer question correctly, should update views', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value, answer.denominator.value);

      fixture.detectChanges();
      let questionsAnsweredView = getQuestionsAnsweredView(fixture)
      expect(questionsAnsweredView.nativeElement.textContent).toContain(1);
    });
  });

  it('after answer question incorrectly, should update views', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe("");

      let answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value + 1, answer.denominator.value);

      fixture.detectChanges();
      let questionsAnsweredView = getQuestionsAnsweredView(fixture);
      expect(questionsAnsweredView.nativeElement.textContent).toContain(1);

      expect(messagesView.nativeElement.textContent).toBe(WRONG_ANSWER_TEXT);
    });
  });

  it('after answer question incorrectly, then correctly, wrong answer text goes away', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe("");

      let answer = getAnswer(fixture);
      setAnswer(fixture, answer.numerator.value + 1, answer.denominator.value);

      fixture.detectChanges();
      let questionsAnsweredView = getQuestionsAnsweredView(fixture);
      expect(questionsAnsweredView.nativeElement.textContent).toContain(1);

      expect(messagesView.nativeElement.textContent).toBe(WRONG_ANSWER_TEXT);

      setAnswer(fixture, answer.numerator.value, answer.denominator.value);
      fixture.detectChanges();

      expect(questionsAnsweredView.nativeElement.textContent).toContain(1);
      expect(messagesView.nativeElement.textContent).toBe("");
    });
  });

  it('type in letters into numerator input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answerErrorMessage = fixture.debugElement.query(By.css(".answer-error"));
      expect(answerErrorMessage).toBeFalsy();

      let answerInput = getAnswerNumeratorInputView(fixture);
      answerInput.nativeElement.value = "Some text";
      answerInput.nativeElement.dispatchEvent(new Event("input"));

      fixture.detectChanges();
      answerErrorMessage = fixture.debugElement.query(By.css(".answer-error"));
      expect(answerErrorMessage.nativeElement.textContent).toContain("Answer must");
    });
  });

  it('type in letters into denominator input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answerErrorMessage = fixture.debugElement.query(By.css(".answer-error"));
      expect(answerErrorMessage).toBeFalsy();

      let answerInput = getAnswerDenominatorInputView(fixture);
      answerInput.nativeElement.value = "Some text";
      answerInput.nativeElement.dispatchEvent(new Event("input"));

      fixture.detectChanges();
      answerErrorMessage = fixture.debugElement.query(By.css(".answer-error"));
      expect(answerErrorMessage.nativeElement.textContent).toContain("Answer must");
    });
  });

  it("clock ticks correctly", () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe("60");

      jasmine.clock().tick(1001);
      fixture.detectChanges();

      expect(timeRemainingView.nativeElement.textContent).toBe("59");
      jasmine.clock().uninstall();
    });
  });

  it('let clock tick all the way down without answering, shows not enough questions answered message', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe("");

      jasmine.clock().tick(60001);
      fixture.detectChanges();

      let timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe("0");

      expect(messagesView.nativeElement.textContent).toBe(NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT);

      jasmine.clock().uninstall();
    });
  });

  it('let clock tick all the way down and answer enough questions correctly, shows next level message', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      expect(messagesView.nativeElement.textContent).toBe("");

      let questionsNeeded = FRACTION_ADDITION_LEVEL_ORDER[1].questionThresholdPerSixtySeconds;

      for (let i = 0; i < questionsNeeded; i++) {
        let answer = getAnswer(fixture);
        setAnswer(fixture, answer.numerator.value, answer.denominator.value);
        fixture.detectChanges();
      }

      let questionsAnsweredView = getQuestionsAnsweredView(fixture);
      expect(questionsAnsweredView.nativeElement.textContent).toContain(questionsNeeded);

      let timeRemainingView = getTimeRemainingView(fixture);
      expect(timeRemainingView.nativeElement.textContent).toBe("60");

      jasmine.clock().tick(60001);
      fixture.detectChanges();

      expect(timeRemainingView.nativeElement.textContent).toBe("0");
      expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });

  it('finish all levels, shows finished highest level message', () => {
    jasmine.clock().install();

    fixture.whenStable().then(() => {
      let levelView = fixture.debugElement.query(By.css(".level"));
      const levelNamePrefixes = ["Easy", "Medium", "Challenging", "Hard", "Expert"];

      for (let level = 1; level < FRACTION_ADDITION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levelNamePrefixes[level] + " Fraction Addition");
        expect(messagesView.nativeElement.textContent).toBe("");

        let questionsNeeded = FRACTION_ADDITION_LEVEL_ORDER[level].questionThresholdPerSixtySeconds;

        for (let i = 0; i < questionsNeeded; i++) {
          let answer = getAnswer(fixture);
          setAnswer(fixture, answer.numerator.value, answer.denominator.value);
          fixture.detectChanges();
        }

        let questionsAnsweredView = getQuestionsAnsweredView(fixture);
        expect(questionsAnsweredView.nativeElement.textContent).toContain(questionsNeeded);

        let timeRemainingView = getTimeRemainingView(fixture);
        expect(timeRemainingView.nativeElement.textContent).toBe("60");

        jasmine.clock().tick(60001);
        fixture.detectChanges();

        expect(timeRemainingView.nativeElement.textContent).toBe("0");
        if (level < FRACTION_ADDITION_LEVEL_ORDER.length - 1) {
          expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(FINISHED_HIGHEST_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });
});
