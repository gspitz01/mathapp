import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { SIMPLIFY_FRACTION_LEVEL_ORDER } from '../../../core/domain/models/fractions/simplify-fraction-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { Stats } from 'src/app/core/domain/models/stats';
import { SimplifyFractionTimedQuiz } from 'src/app/core/domain/models/fractions/simplify-fraction-timed-quiz';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';

const startButtonText = 'Start';
const stopButtonText = 'Stop';
const validAnswerRegex = /^[0-9\-]*$/;

@Component({
  selector: 'app-simplify-fraction',
  templateUrl: './simplify-fraction.component.html',
  styleUrls: ['./simplify-fraction.component.scss']
})
export class SimplifyFractionComponent implements OnInit {
  quizName = QUIZ_NAMES[9];  // 'simplify-fraction'
  levelOrder = SIMPLIFY_FRACTION_LEVEL_ORDER;
  buttonText: string;
  private maxLevel: number;
  private answerNum = new FormControl('');
  private answerDen = new FormControl('');
  private answerDisabled: boolean;
  @ViewChild('numeratorInput', { static: false }) numInput: ElementRef;
  quiz: SimplifyFractionTimedQuiz;

  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.quiz = new SimplifyFractionTimedQuiz(new Seconds(60), 0, this.levelOrder, this.quizName,
      () => {
        this.clearAnswerInput();
        this.buttonText = stopButtonText;
        this.answerDisabled = false;
        if (this.numInput) {
          this.numInput.nativeElement.focus();
        }
      },
      () => {
        this.buttonText = startButtonText;
        this.answerDisabled = true;
        this.clearAnswerInput();
      },
      (stats: Stats) => {
        // Send the round stats and update for maxLevels
        // Don't send maxLevel update if we received a maxLevel and it's greater than or equal to currentLevel
        if (this.maxLevel && this.quiz.currentLevel <= this.maxLevel) {
          this.statsService.addStats(stats, null);
        } else {
          this.statsService.addStats(stats, {[this.quizName]: this.quiz.currentLevel});
        }
      }
    );
    this.buttonText = startButtonText;
    this.answerDisabled = true;
    this.statsService.getMaxLevels().subscribe(maxLevels => {
      if (maxLevels && maxLevels.hasOwnProperty(this.quizName)) {
        this.maxLevel = maxLevels[this.quizName];
        if (!this.quiz.isTimerRunning()) {
          this.quiz.currentLevel = this.maxLevel;
        }
      }
    });
  }

  start() {
    if (this.quiz.isTimerRunning()) {
      this.quiz.stopTimer();
    } else {
      this.quiz.startTimer();
    }
  }

  onEnter() {
    if (!this.answerDisabled && this.answerIsValid()) {
      const answer = this.answerNum.value + SimplifyFractionTimedQuiz.ANSWER_DELIMITER + this.answerDen.value;
      this.quiz.answerQuestion(answer);
      this.clearAnswerInput();
      this.numInput.nativeElement.focus();
    }
  }

  answerIsValid(): boolean {
    return this.answerNum.value && this.answerDen.value &&
      validAnswerRegex.test(this.answerNum.value) && validAnswerRegex.test(this.answerDen.value);
  }

  clearAnswerInput() {
    this.answerNum.setValue('');
    this.answerDen.setValue('');
  }
}
