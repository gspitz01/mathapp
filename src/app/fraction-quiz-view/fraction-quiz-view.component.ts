import { Component, OnInit, Input } from '@angular/core';
import { Seconds } from '../seconds';
import { FormControl } from '@angular/forms';
import { FractionTimeLimitedRound } from '../fraction-time-limited-round';
import { FractionRoundLevel } from '../fraction-round-level';
import { ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT, NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, NOT_ENOUGH_CORRECT_ANSWERS_TO_ADVANCE_TEXT } from '../constants';

const startButtonText = "Start";
const stopButtonText = "Stop";
const validAnswerRegex = /^[0-9\-]*$/;

@Component({
  selector: 'app-fraction-quiz-view',
  templateUrl: './fraction-quiz-view.component.html',
  styleUrls: ['./fraction-quiz-view.component.scss']
})
export class FractionQuizViewComponent implements OnInit {

  @Input() startingLevel: number;
  @Input() startingTime: Seconds;
  @Input() levelOrder: FractionRoundLevel[];
  buttonText: string;
  messages: string;
  timeLeft: number;
  round: FractionTimeLimitedRound;
  currentLevel: number;
  // Timer for saving window.setInterval id
  private timer: number;
  private answerNum = new FormControl("");
  private answerDen = new FormControl("");
  private answerDisabled: boolean;

  constructor() { }

  ngOnInit() {
    this.buttonText = startButtonText;
    this.currentLevel = this.startingLevel;
    this.timeLeft = this.startingTime.value;
    this.timer = null;
    this.answerDisabled = true;
  }

  newRound() {
    this.round = new FractionTimeLimitedRound(this.startingTime, this.levelOrder[this.currentLevel]);
  }

  start() {
    this.messages = "";
    if (this.timer != null) {
      // If the timer isn't null, it's running, stop it
      window.clearInterval(this.timer);
      this.buttonText = startButtonText;
      this.timer = null;
      this.answerDisabled = true;
      this.evauluateRound();
    } else {
      // timer not yet running, start the round
      this.newRound();
      this.timeLeft = this.round.getTimeRemaining().value;
      this.round.start();
      this.clearAnswerInput();
      this.buttonText = stopButtonText;
      this.answerDisabled = false;
      let that = this;
      this.timer = window.setInterval(function() {
        that.round.tick();
        let timeLeft = that.round.getTimeRemaining().value;
        that.timeLeft = timeLeft;
        if (timeLeft <= 0) {
          window.clearInterval(that.timer);
          that.timer = null;
          that.answerDisabled = true;
          that.buttonText = startButtonText;
          that.evauluateRound();
        }
      }, 1000);
    }
  }

  onEnter() {
    if (!this.answerDisabled && this.answerIsValid()) {
      let answer = this.answerNum.value + "/" + this.answerDen.value;
      let answerEval = this.round.answerQuestion(answer);
      this.clearAnswerInput();
    }
  }

  answerIsValid(): boolean {
    return validAnswerRegex.test(this.answerNum.value) && validAnswerRegex.test(this.answerDen.value);
  }

  clearAnswerInput() {
    this.answerNum.setValue("");
    this.answerDen.setValue("");
  }

  evauluateRound() {
    this.clearAnswerInput();
    let correctAnswers = this.round.getNumberOfCorrectAnswers();
    let questionsAnswered = this.round.getNumberOfQuestionsAnswered()
    let correctRatio = correctAnswers / questionsAnswered;
    let round = this.levelOrder[this.currentLevel];
    let questionThreshold = Math.floor(round.questionThresholdPerSixtySeconds * this.startingTime.value/60);
    if (questionsAnswered >= questionThreshold &&
      correctRatio >= round.correctRatioThreshold) {
        if (this.currentLevel < this.levelOrder.length - 1) {
          this.currentLevel++;
          this.messages = ADVANCE_TO_NEXT_LEVEL_TEXT;
        } else {
          this.messages = FINISHED_HIGHEST_LEVEL_TEXT;
        }
    } else if (questionsAnswered < questionThreshold) {
      this.messages = NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT;
    } else {
      this.messages = NOT_ENOUGH_CORRECT_ANSWERS_TO_ADVANCE_TEXT;
    }
  }
}
