import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { BasicRoundLevel } from 'src/app/core/domain/models/basics/basic-round-level';
import { Stats } from 'src/app/core/domain/models/stats';
import { BasicTimedQuiz } from 'src/app/core/domain/models/basics/basic-timed-quiz';

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
  private maxLevel: number;
  private answer = new FormControl("");
  private answerDisabled: boolean;
  @ViewChild('answerInp') answerInput: ElementRef;
  quiz: BasicTimedQuiz;

  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.quiz = new BasicTimedQuiz(this.startingTime, this.startingLevel, this.levelOrder, this.quizName,
      () => {
        this.clearAnswerInput();
        this.buttonText = stopButtonText;
        this.answerDisabled = false;
        if (this.answerInput) {
          this.answerInput.nativeElement.focus();
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
      this.quiz.answerQuestion(this.answer.value);
      this.clearAnswerInput();
    }
  }

  answerIsValid(): boolean {
    return this.answer.value && validAnswerRegex.test(this.answer.value);
  }

  clearAnswerInput() {
    this.answer.setValue("");
  }
}
