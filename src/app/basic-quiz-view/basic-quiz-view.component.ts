import { Component, OnInit, Input } from '@angular/core';
import { BasicTimeLimitedRound } from '../basic-time-limited-round';
import { Seconds } from '../seconds';
import { FormControl } from '@angular/forms';
import { BasicRoundLevel } from '../basic-round-level';

const startButtonText = "Start";
const stopButtonText = "Stop";
const advanceToNextLevelText = "You can move on to the next level!";
const finishedHighestLevelText = "You finished the highest level! Congratulations!";
const notEnoughQuestionsToAdvanceText = "You did not answer enough questions to reach the next level.";
const notEnoughCorrectAnswersToAdvanceText = "You did not answer enough questions correctly to reach the next level.";
const validAnswerRegex = /^[0-9\-]*$/;

@Component({
  selector: 'app-basic-quiz-view',
  templateUrl: './basic-quiz-view.component.html',
  styleUrls: ['./basic-quiz-view.component.scss']
})
export class BasicQuizViewComponent implements OnInit {

  @Input() startingLevel: number;
  @Input() startingTime: Seconds;
  @Input() levelOrder: BasicRoundLevel[];
  buttonText: string;
  messages: string;
  timeLeft: number;
  round: BasicTimeLimitedRound;
  currentLevel: number;
  // Timer for saving window.setInterval id
  private timer: number;
  private answer = new FormControl("");
  private answerDisabled: boolean;

  constructor() {
  }

  ngOnInit() {
    this.buttonText = startButtonText;
    this.currentLevel = this.startingLevel;
    this.timeLeft = this.startingTime.value;
    this.timer = null;
    this.answerDisabled = true;
  }

  newRound() {
    this.round = new BasicTimeLimitedRound(this.startingTime, this.levelOrder[this.currentLevel]);
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
      let answerEval = this.round.answerQuestion(this.answer.value);
      this.clearAnswerInput();
    }
  }

  answerIsValid(): boolean {
    return validAnswerRegex.test(this.answer.value);
  }

  clearAnswerInput() {
    this.answer.setValue("");
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
          this.messages = advanceToNextLevelText;
        } else {
          this.messages = finishedHighestLevelText;
        }
    } else if (questionsAnswered < questionThreshold) {
      this.messages = notEnoughQuestionsToAdvanceText;
    } else {
      this.messages = notEnoughCorrectAnswersToAdvanceText;
    }
  }
}
