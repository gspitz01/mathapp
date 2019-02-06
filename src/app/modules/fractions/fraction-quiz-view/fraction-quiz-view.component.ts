import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { FractionRoundLevel } from '../../../core/domain/models/fractions/fraction-round-level';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { Stats } from 'src/app/core/domain/models/stats';
import { FractionTimedQuiz } from 'src/app/core/domain/models/fractions/fraction-timed-quiz';

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
  @Input() quizName: string;
  buttonText: string;
  private maxLevel: number;
  private answerNum = new FormControl("");
  private answerDen = new FormControl("");
  private answerDisabled: boolean;
  @ViewChild('numeratorInput') numInput: ElementRef;
  quiz: FractionTimedQuiz;

  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.quiz = new FractionTimedQuiz(this.startingTime, this.startingLevel, this.levelOrder, this.quizName,
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
      let answer = this.answerNum.value + FractionTimedQuiz.ANSWER_DELIMITER + this.answerDen.value;
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
    this.answerNum.setValue("");
    this.answerDen.setValue("");
  }
}
