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
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { WRONG_ANSWER_TEXT, NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT,
  ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT } from 'src/app/core/domain/models/constants';

function getTimeRemainingView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".time-remaining"));
}

function getQuestionsAnsweredView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".questions-answered"));
}

function getOperandNumeratorView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand-numerator"));
}

function getOperandDenominatorView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand-denominator"));
}

function getAnswerNumeratorInputView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css("#answer-num"));
}

function getAnswerDenominatorInputView(fixture: ComponentFixture<SimplifyFractionComponent>): DebugElement {
  return fixture.debugElement.query(By.css("#answer-den"));
}

function getAnswer(fixture: ComponentFixture<SimplifyFractionComponent>): FractionResult {
  let operand1NumeratorView = getOperandNumeratorView(fixture);
      let operand1DenominatorView = getOperandDenominatorView(fixture);
      let opNum = parseInt(operand1NumeratorView.nativeElement.textContent);
      let opDen = parseInt(operand1DenominatorView.nativeElement.textContent);
      return SIMPLIFY_FRACTION.operation(new BasicOperand(opNum), new BasicOperand(opDen));
}

function setAnswer(fixture: ComponentFixture<SimplifyFractionComponent>, num: number, den: number) {
  let answerNumInput = getAnswerNumeratorInputView(fixture);
      let answerDenInput = getAnswerDenominatorInputView(fixture);
      answerNumInput.nativeElement.value = num;
      answerDenInput.nativeElement.value = den;
      answerNumInput.nativeElement.dispatchEvent(new Event("input"));
      answerDenInput.nativeElement.dispatchEvent(new Event("input"));
      answerDenInput.triggerEventHandler('keyup.enter', {});
}


describe('SimplifyFractionComponent', () => {
  let component: SimplifyFractionComponent;
  let fixture: ComponentFixture<SimplifyFractionComponent>;
  let startButton: DebugElement;
  let messagesView: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplifyFractionComponent ],
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
    fixture = TestBed.createComponent(SimplifyFractionComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css("#start"));
    messagesView = fixture.debugElement.query(By.css(".messages"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe("Start");
  });

  it('should display "Level: Twos"', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain("Easy Simplify Fractions");
  });

  it('after start clicked, time should display', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let timeRemainingView = fixture.debugElement.query(By.css(".time-remaining"));
      expect(timeRemainingView.nativeElement.textContent).toBe('60');
    });
  });

  it('jump to level with click on level name', () => {
    fixture.whenStable().then(() => {
      fixture.debugElement.query(By.css('.jump-to-level-button')).nativeElement.click();
      fixture.detectChanges();
      let easyFivesLevelButton = fixture.debugElement.query(By.css("#hard-simplify-fractions"));
      easyFivesLevelButton.nativeElement.click();
      fixture.detectChanges();

      let levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Hard');
    });
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

      let questionsNeeded = SIMPLIFY_FRACTION_LEVEL_ORDER[0].questionThresholdPerSixtySeconds;

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

      for (let level = 0; level < SIMPLIFY_FRACTION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levelNamePrefixes[level] + " Simplify Fractions");
        expect(messagesView.nativeElement.textContent).toBe("");

        let questionsNeeded = SIMPLIFY_FRACTION_LEVEL_ORDER[level].questionThresholdPerSixtySeconds;

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
        if (level < SIMPLIFY_FRACTION_LEVEL_ORDER.length - 1) {
          expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(FINISHED_HIGHEST_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });
});
