import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QuizName } from 'src/app/core/domain/models/quiz-name';
import { TimedQuiz } from 'src/app/core/domain/models/timed-quiz';
import { Stats } from 'src/app/core/domain/models/stats';
import { RoundLevel } from 'src/app/core/domain/models/round-level';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-quiz-view',
  template: `Something has gone wrong if you're seeing this - BaseQuizViewComponent`
})
export class BaseQuizViewComponent implements OnInit, OnDestroy {

  static readonly startButtonText = 'Start';
  static readonly stopButtonText = 'Stop';
  static readonly validAnswerRegex = /^[0-9\-]*$/;

  @Input() startingLevel: number;
  @Input() startingTime: Seconds;
  @Input() levelOrder: RoundLevel[];
  @Input() quizName: QuizName;
  @Input() title: string;
  quiz: TimedQuiz;
  buttonText: string;
  protected answerDisabled: boolean;
  protected maxLevel: number;
  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  // Subject to cue destroying subscription of maxLevels
  private readonly onDestroy = new Subject<void>();

  /**
   * Base class for all QuizViewComponents
   * Sublesses must override clearAnswerInput()
   * @param statsService StatsService injected into the child class
   */
  constructor(public statsService: StatsService, public route: ActivatedRoute) { }

  /**
   * Subclasses need to override this. Can't use abstract class with Angular Component.
   */
  clearAnswerInput() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy.next();
  }

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
    this.statsService.getMaxLevels().pipe(
      takeUntil(this.onDestroy)
    )
    .subscribe(maxLevels => {
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
      this.statsService.addStats(stats, null).pipe(
        first(),
        takeUntil(this.onDestroy)
      ).subscribe();
    } else {
      this.statsService.addStats(stats, {[this.quizName]: this.quiz.currentLevel}).pipe(
        first(),
        takeUntil(this.onDestroy)
      ).subscribe();
    }
  }

  retrieveRouteData() {
    this.startingLevel = this.route.snapshot.data['startingLevel'];
      this.startingTime = new Seconds(this.route.snapshot.data['startingTime']);
      this.quizName = this.route.snapshot.data['quizName'];
      this.title = this.route.snapshot.data['title'];
      const levelOrder = this.route.snapshot.data['levelOrder'];
      // If the level order is two dimensional, we should be able
      // to resolve it to one dimension using the route param 'roundName'
      if (levelOrder && levelOrder.length > 0 &&
        Array.isArray(levelOrder[0]) && this.route.snapshot.params['roundName']) {
        let roundIndex = this.route.snapshot.data['roundNamesArray'].map(numberName => numberName.toLocaleLowerCase())
          .indexOf(this.route.snapshot.params['roundName']);
        let roundName = this.route.snapshot.params['roundName'];
        if (roundIndex === -1) {
          roundIndex = this.route.snapshot.data['defaultRoundIndex'];
          roundName = this.route.snapshot.data['defaultRoundName'];
        }
        this.levelOrder =  levelOrder[roundIndex];
        this.quizName += '-' + roundName;
      } else {
        this.levelOrder = levelOrder;
      }
  }

}
