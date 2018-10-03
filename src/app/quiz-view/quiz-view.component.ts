import { Component, OnInit } from '@angular/core';
import { TimeLimitedRound } from '../time-limited-round';
import { LEVEL_ORDER } from '../round-levels';
import { Seconds } from '../seconds';

const startButtonText = "Start";
const stopButtonText = "Stop";
const defaultTime = new Seconds(20);
const questionThresholdForAdvancing = 1;
const correctRatioThresholdForAdvancing = 0.8;
const advanceToNextLevelText = "You can move on to the next level!";
const notEnoughQuestionsToAdvanceText = "You did not answer enough questions to reach the next level.";
const notEnoughCorrectAnswersToAdvanceText = "You did not answer enough questions correctly to reach the next level.";
const startingLevel = 15;

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {

  buttonText: string;
  round: TimeLimitedRound;
  // Timer for saving window.setInterval id
  timer: number;
  timeLeft: number;
  answerDisabled: boolean;
  questionsSeen: number;
  correctAnswers: number;
  messages: string;
  currentLevel: number;

  constructor() {
    this.buttonText = startButtonText;
    this.currentLevel = startingLevel;
    this.newRound();
    this.updateStats();
    this.timeLeft = this.round.getTimeRemaining().value;
    this.timer = null;
    this.answerDisabled = true;
  }

  ngOnInit() {
  }

  newRound() {
    this.round = new TimeLimitedRound(defaultTime, LEVEL_ORDER[this.currentLevel]);
  }

  start() {
    this.messages = "";
    this.timeLeft = this.round.getTimeRemaining().value;
    if (this.timer != null) {
      // If the timer isn't null, it's running, stop it
      window.clearInterval(this.timer);
      this.buttonText = startButtonText;
      this.timer = null;
      this.answerDisabled = true;
      this.evauluateRound();
    } else {
      // timer not yet running, start the round
      this.round.start();
      this.updateStats();
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

  onEnter(value: string) {
    if (!this.answerDisabled) {
      let answerEval = this.round.answerQuestion(value);
      this.updateStats();
    }
  }

  updateStats() {
    this.questionsSeen = this.round.getNumberOfQuestionsAnswered();
    this.correctAnswers = this.round.getNumberOfCorrectAnswers();
  }

  evauluateRound() {
    this.updateStats();
    let correctRatio = this.correctAnswers / this.questionsSeen;
    if (this.questionsSeen > questionThresholdForAdvancing &&
      correctRatio > correctRatioThresholdForAdvancing) {
      this.messages = advanceToNextLevelText;
      if (this.currentLevel < LEVEL_ORDER.length - 1) {
        this.currentLevel++;
      }
    } else if (this.questionsSeen <= questionThresholdForAdvancing) {
      this.messages = notEnoughQuestionsToAdvanceText;
    } else {
      this.messages = notEnoughCorrectAnswersToAdvanceText;
    }
    this.newRound();
  }
}
