import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { FormControl } from '@angular/forms';
import { FRACTION_LEVEL_ORDER } from '../round-levels';
import { FractionTimeLimitedRound } from '../fraction-time-limited-round';

const startButtonText = "Start";
const stopButtonText = "Stop";
const questionThresholdForAdvancing = 1;
const correctRatioThresholdForAdvancing = 0.8;
const advanceToNextLevelText = "You can move on to the next level!";
const notEnoughQuestionsToAdvanceText = "You did not answer enough questions to reach the next level.";
const notEnoughCorrectAnswersToAdvanceText = "You did not answer enough questions correctly to reach the next level.";
const validAnswerRegex = /^[0-9\-\.]*$/;

@Component({
  selector: 'app-fraction-quiz-view',
  templateUrl: './fraction-quiz-view.component.html',
  styleUrls: ['./fraction-quiz-view.component.scss']
})
export class FractionQuizViewComponent implements OnInit {

  startingLevel: number;
  startingTime: Seconds;
  buttonText: string;
  messages: string;
  timeLeft: number;
  private round: FractionTimeLimitedRound;
  // Timer for saving window.setInterval id
  private timer: number;
  private answerNum = new FormControl("");
  private answerDen = new FormControl("");
  private answerDisabled: boolean;
  private currentLevel: number;

  constructor() { }

  ngOnInit() {
    this.buttonText = startButtonText;
    this.currentLevel = this.startingLevel;
    this.timeLeft = this.startingTime.value;
    this.timer = null;
    this.answerDisabled = true;
  }

  newRound() {
    this.round = new FractionTimeLimitedRound(this.startingTime, FRACTION_LEVEL_ORDER[this.currentLevel]);
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
    if (questionsAnswered >= questionThresholdForAdvancing &&
      correctRatio >= correctRatioThresholdForAdvancing) {
      this.messages = advanceToNextLevelText;
      if (this.currentLevel < FRACTION_LEVEL_ORDER.length - 1) {
        this.currentLevel++;
      }
    } else if (questionsAnswered < questionThresholdForAdvancing) {
      this.messages = notEnoughQuestionsToAdvanceText;
    } else {
      this.messages = notEnoughCorrectAnswersToAdvanceText;
    }
  }
}
