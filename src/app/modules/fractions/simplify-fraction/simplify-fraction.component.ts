import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { SimplifyFractionRoundLevel } from '../../../core/domain/models/fractions/simplify-fraction-round-level';
import { SimplifyFractionTimeLimitedRound } from '../../../core/domain/models/fractions/simplify-fraction-time-limited-round';
import { SimplifyFractionOperatorQuestion } from '../../../core/domain/models/fractions/simplify-fraction-operator-question';
import { SIMPLIFY_FRACTION_LEVEL_ORDER } from '../../../core/domain/models/fractions/simplify-fraction-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { WRONG_ANSWER_TEXT, ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT, NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT } from 'src/app/core/domain/models/constants';
import { Stats } from 'src/app/core/domain/models/stats';

const startButtonText = "Start";
const stopButtonText = "Stop";
const validAnswerRegex = /^[0-9\-]*$/;

@Component({
  selector: 'app-simplify-fraction',
  templateUrl: './simplify-fraction.component.html',
  styleUrls: ['./simplify-fraction.component.scss']
})
export class SimplifyFractionComponent implements OnInit {
  startingLevel: number = 0;
  startingTime: Seconds = new Seconds(60);
  levelOrder: SimplifyFractionRoundLevel[] = SIMPLIFY_FRACTION_LEVEL_ORDER;
  quizName: string = "simplify-fraction";
  buttonText: string;
  messages: string;
  timeLeft: number;
  round: SimplifyFractionTimeLimitedRound;
  currentLevel: number;
  private maxLevel: number;
  // Timer for saving window.setInterval id
  private timer: number;
  private answerNum = new FormControl("");
  private answerDen = new FormControl("");
  private answerDisabled: boolean;
  @ViewChild('numeratorInput') numInput: ElementRef;
  // Data for StatsService
  private roundStart: Date;
  private incorrects: number[][];

  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  constructor(private statsService: StatsService) { }

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
    this.round = new SimplifyFractionTimeLimitedRound(this.startingTime, this.levelOrder[this.currentLevel]);
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
      if (this.numInput) {
        this.numInput.nativeElement.focus();
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
      let answer = this.answerNum.value + "/" + this.answerDen.value;
      let answerEval = this.round.answerQuestion(answer);
      if (answerEval.correct) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
      this.clearAnswerInput();
      this.numInput.nativeElement.focus();
    }
  }

  private rightAnswer() {
    this.messages = "";
  }

  private wrongAnswer() {
    let question = this.round.getCurrentQuestion() as SimplifyFractionOperatorQuestion;
    // Zero at end of this array is just an indicator that this is a Simplify Fractions answer,
    // to differentiate between a Fractions answer without the guess
    this.incorrects.push([question.numerator.value, question.denominator.value, this.answerNum.value,
      this.answerDen.value, 0]);
    this.messages = WRONG_ANSWER_TEXT;
  }

  answerIsValid(): boolean {
    return this.answerNum.value && this.answerDen.value &&
      validAnswerRegex.test(this.answerNum.value) && validAnswerRegex.test(this.answerDen.value);
  }

  clearAnswerInput() {
    this.answerNum.setValue("");
    this.answerDen.setValue("");
  }

  evauluateRound() {
    this.clearAnswerInput();
    let questionsAnswered = this.round.getNumberOfQuestionsAnswered()

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
