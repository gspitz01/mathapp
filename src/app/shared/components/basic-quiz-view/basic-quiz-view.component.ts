import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { BasicRoundLevel } from 'src/app/core/domain/models/basics/basic-round-level';
import { BasicTimeLimitedRound } from 'src/app/core/domain/models/basics/basic-time-limited-round';
import { BasicOperatorQuestion } from 'src/app/core/domain/models/basics/basic-operator-question';
import { WRONG_ANSWER_TEXT, ADVANCE_TO_NEXT_LEVEL_TEXT,
  FINISHED_HIGHEST_LEVEL_TEXT, NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT } from 'src/app/core/domain/models/constants';
import { Stats } from 'src/app/core/domain/models/stats';

const startButtonText = "Start";
const stopButtonText = "Stop";
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
  @Input() quizName: string;
  buttonText: string;
  messages: string;
  timeLeft: number;
  round: BasicTimeLimitedRound;
  currentLevel: number;
  private maxLevel: number;
  // Timer for saving window.setInterval id
  private timer: number;
  private answer = new FormControl("");
  private answerDisabled: boolean;
  @ViewChild('answerInp') answerInput: ElementRef;
  // Data for stats service
  private roundStart: Date;
  private incorrects: number[][];

  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  constructor(private statsService: StatsService) {

  }

  ngOnInit() {
    this.buttonText = startButtonText;
    this.currentLevel = this.startingLevel;
    this.timeLeft = this.startingTime.value;
    this.timer = null;
    this.answerDisabled = true;
    this.statsService.getMaxLevels().subscribe(maxLevels => {
      if (maxLevels && maxLevels.hasOwnProperty(this.quizName)) {
        this.maxLevel = maxLevels[this.quizName];
        if (this.timer == null) {
          this.currentLevel = this.maxLevel;
        }
      }
    });
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
      this.roundStart = new Date();
      this.incorrects = [];
      this.newRound();
      this.timeLeft = this.round.getTimeRemaining().value;
      this.round.start();
      this.clearAnswerInput();
      this.buttonText = stopButtonText;
      this.answerDisabled = false;
      if (this.answerInput) {
        this.answerInput.nativeElement.focus();
      }
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
      if (answerEval.correct) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
      this.clearAnswerInput();
    }
  }

  private rightAnswer() {
    this.messages = "";
  }

  private wrongAnswer() {
    let question = this.round.getCurrentQuestion() as BasicOperatorQuestion;
    this.incorrects.push([question.operand1.value, question.operand2.value, this.answer.value]);
    this.messages = WRONG_ANSWER_TEXT;
  }

  answerIsValid(): boolean {
    return this.answer.value && validAnswerRegex.test(this.answer.value);
  }

  clearAnswerInput() {
    this.answer.setValue("");
  }

  evauluateRound() {
    this.clearAnswerInput();
    let questionsAnswered = this.round.getNumberOfQuestionsAnswered();

    let round = this.levelOrder[this.currentLevel];
    let questionThreshold = Math.floor(round.questionThresholdPerSixtySeconds * this.startingTime.value/60);
    if (questionsAnswered >= questionThreshold) {
      if (this.currentLevel < this.levelOrder.length - 1) {
        this.currentLevel++;
        this.messages = ADVANCE_TO_NEXT_LEVEL_TEXT;
      } else {
        this.messages = FINISHED_HIGHEST_LEVEL_TEXT;
      }
    } else {
      this.messages = NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT;
    }

    // Send stats to StatsService
    this.sendStats(questionsAnswered);
  }

  private sendStats(questionsAnswered: number) {
    let roundStats = new Stats(this.roundStart, new Date(), this.round.level.name,
      this.round.level.questionThresholdPerSixtySeconds, questionsAnswered, this.incorrects);
    // Send the round stats and update for maxLevels
    // Don't send maxLevel update if we received a maxLevel and it's greater than or equal to currentLevel
    if (this.maxLevel && this.currentLevel <= this.maxLevel) {
      this.statsService.addStats(roundStats, null);
    } else {
      this.statsService.addStats(roundStats, {[this.quizName]: this.currentLevel});
    }
  }
}
