import { Component, OnInit, Input } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QuizName } from 'src/app/core/domain/models/quiz-name';
import { TimedQuiz } from 'src/app/core/domain/models/timed-quiz';
import { Stats } from 'src/app/core/domain/models/stats';
import { RoundLevel } from 'src/app/core/domain/models/round-level';

@Component({
  selector: 'app-base-quiz-view',
  template: `Something has gone wrong if you're seeing this - BaseQuizViewComponent`
})
export class BaseQuizViewComponent implements OnInit {

  static readonly startButtonText = 'Start';
  static readonly stopButtonText = 'Stop';
  static readonly validAnswerRegex = /^[0-9\-]*$/;

  @Input() startingLevel: number;
  @Input() startingTime: Seconds;
  @Input() levelOrder: RoundLevel[];
  @Input() quizName: QuizName;
  quiz: TimedQuiz;
  buttonText: string;
  protected answerDisabled: boolean;
  protected maxLevel: number;
  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  /**
   * Base class for all QuizViewComponents
   * Sublesses must override clearAnswerInput()
   * @param statsService StatsService injected into the child class
   */
  constructor(public statsService: StatsService) { }

  /**
   * Subclasses need to override this. Can't use abstract class with Angular Component.
   */
  clearAnswerInput() {}

  ngOnInit() {}

  start() {
    if (this.quiz.isTimerRunning()) {
      this.quiz.stopTimer();
    } else {
      this.quiz.startTimer();
    }
  }

  resetUI() {
    this.buttonText = BaseQuizViewComponent.startButtonText;
    this.answerDisabled = true;
    this.clearAnswerInput();
  }

  setUI() {
    this.clearAnswerInput();
    this.buttonText = BaseQuizViewComponent.stopButtonText;
    this.answerDisabled = false;
  }

  getMaxLevels() {
    this.statsService.getMaxLevels().subscribe(maxLevels => {
      if (maxLevels && maxLevels.hasOwnProperty(this.quizName)) {
        this.maxLevel = maxLevels[this.quizName];
        if (!this.quiz.isTimerRunning()) {
          this.quiz.currentLevel = this.maxLevel;
        }
      }
    });
  }

  sendStats(stats: Stats) {
    // Send the round stats and update for maxLevels
    // Don't send maxLevel update if we received a maxLevel and it's greater than or equal to currentLevel
    if (this.maxLevel && this.quiz.currentLevel <= this.maxLevel) {
      this.statsService.addStats(stats, null);
    } else {
      this.statsService.addStats(stats, {[this.quizName]: this.quiz.currentLevel});
    }
  }

}
