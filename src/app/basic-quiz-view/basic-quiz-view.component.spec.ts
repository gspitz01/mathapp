import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { BasicQuizViewComponent } from './basic-quiz-view.component';
import { Seconds } from '../seconds';
import { BASIC_ADDITION_LEVEL_ORDER } from '../round-levels';
import { ADDITION } from '../basic-operators';
import { NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, ADVANCE_TO_NEXT_LEVEL_TEXT,
  FINISHED_HIGHEST_LEVEL_TEXT, WRONG_ANSWER_TEXT } from '../constants';
import { StatsService } from '../stats.service';
import { MockStatsService } from '../test-constants';

const defaultStartingTime = new Seconds(60);

function getTimeRemainingView(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".time-remaining"));
}

function getQuestionsAnsweredView(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".questions-answered"));
}

function getOperand1View(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand1"));
}

function getOperand2View(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css(".operand2"));
}

function getAnswerInputView(fixture: ComponentFixture<BasicQuizViewComponent>): DebugElement {
  return fixture.debugElement.query(By.css("#answer"));
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
      expect(operatorView.nativeElement.textContent).toBe(ADDITION.display);

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

      let operand1View = getOperand1View(fixture);
      let operand2View = getOperand2View(fixture);
      let op1 = parseInt(operand1View.nativeElement.textContent);
      let op2 = parseInt(operand2View.nativeElement.textContent);

      let answerInput = getAnswerInputView(fixture);
      answerInput.nativeElement.value = op1 + op2;
      answerInput.nativeElement.dispatchEvent(new Event("input"));
      answerInput.triggerEventHandler('keyup.enter', {});

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

      let operand1View = getOperand1View(fixture);
      let operand2View = getOperand2View(fixture);
      let op1 = parseInt(operand1View.nativeElement.textContent);
      let op2 = parseInt(operand2View.nativeElement.textContent);

      let answerInput = getAnswerInputView(fixture);
      answerInput.nativeElement.value = op1 + op2 + 4;
      answerInput.nativeElement.dispatchEvent(new Event("input"));
      answerInput.triggerEventHandler("keyup.enter", {});

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

      let operand1View = getOperand1View(fixture);
      let operand2View = getOperand2View(fixture);
      let op1 = parseInt(operand1View.nativeElement.textContent);
      let op2 = parseInt(operand2View.nativeElement.textContent);

      let answerInput = getAnswerInputView(fixture);
      answerInput.nativeElement.value = op1 + op2 + 4;
      answerInput.nativeElement.dispatchEvent(new Event("input"));
      answerInput.triggerEventHandler("keyup.enter", {});

      fixture.detectChanges();
      let questionsAnsweredView = getQuestionsAnsweredView(fixture);
      expect(questionsAnsweredView.nativeElement.textContent).toContain(1);

      expect(messagesView.nativeElement.textContent).toBe(WRONG_ANSWER_TEXT);

      answerInput.nativeElement.value = op1 + op2;
      answerInput.nativeElement.dispatchEvent(new Event("input"));
      answerInput.triggerEventHandler("keyup.enter", {});

      fixture.detectChanges();
      expect(questionsAnsweredView.nativeElement.textContent).toContain(1);

      expect(messagesView.nativeElement.textContent).toBe("");
    });
  });

  it('type in letters into input, shows error message', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();

      let answerErrorMessage = fixture.debugElement.query(By.css(".answer-error"));
      expect(answerErrorMessage).toBeFalsy();

      let answerInput = getAnswerInputView(fixture);
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

      let operand1View = getOperand1View(fixture);
      let operand2View = getOperand2View(fixture);
      let answerInput = getAnswerInputView(fixture);
      let questionsNeeded = BASIC_ADDITION_LEVEL_ORDER[1].questionThresholdPerSixtySeconds;

      for (let i = 0; i < questionsNeeded; i++) {
        let op1 = parseInt(operand1View.nativeElement.textContent);
        let op2 = parseInt(operand2View.nativeElement.textContent);
        answerInput.nativeElement.value = op1 + op2;
        answerInput.nativeElement.dispatchEvent(new Event("input"));
        answerInput.triggerEventHandler("keyup.enter", {});
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

      let targetView = fixture.debugElement.query(By.css(".target"));
      const targets = [25, 20, 15, 8, 5];

      for (let level = 1; level < BASIC_ADDITION_LEVEL_ORDER.length; level++) {
        startButton.nativeElement.click();
        fixture.detectChanges();

        expect(levelView.nativeElement.textContent).toContain(levelNamePrefixes[level] + " " + "Addition");
        expect(targetView.nativeElement.textContent).toContain(targets[level]);
        expect(messagesView.nativeElement.textContent).toBe("");

        let operand1View = getOperand1View(fixture);
        let operand2View = getOperand2View(fixture);
        let answerInputView = getAnswerInputView(fixture);
        let questionsNeeded = BASIC_ADDITION_LEVEL_ORDER[level].questionThresholdPerSixtySeconds;

        for (let i = 0; i < questionsNeeded; i++) {
          let op1 = parseInt(operand1View.nativeElement.textContent);
          let op2 = parseInt(operand2View.nativeElement.textContent);
          answerInputView.nativeElement.value = op1 + op2;
          answerInputView.nativeElement.dispatchEvent(new Event("input"));
          answerInputView.triggerEventHandler("keyup.enter", {});
          fixture.detectChanges();
        }

        let questionsAnsweredView = getQuestionsAnsweredView(fixture);
        expect(questionsAnsweredView.nativeElement.textContent).toContain(questionsNeeded);

        let timeRemainingView = getTimeRemainingView(fixture);
        expect(timeRemainingView.nativeElement.textContent).toBe("60");

        jasmine.clock().tick(60001);
        fixture.detectChanges();

        expect(timeRemainingView.nativeElement.textContent).toBe("0");
        if (level < BASIC_ADDITION_LEVEL_ORDER.length - 1) {
          expect(messagesView.nativeElement.textContent).toBe(ADVANCE_TO_NEXT_LEVEL_TEXT);
        }
      }

      expect(messagesView.nativeElement.textContent).toBe(FINISHED_HIGHEST_LEVEL_TEXT);

      jasmine.clock().uninstall();
    });
  });
});
