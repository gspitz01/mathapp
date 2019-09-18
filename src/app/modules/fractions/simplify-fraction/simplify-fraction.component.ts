import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { SIMPLIFY_FRACTION_LEVEL_ORDER } from '../../../core/domain/models/fractions/simplify-fraction-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { Stats } from 'src/app/core/domain/models/stats';
import { SimplifyFractionTimedQuiz } from 'src/app/core/domain/models/fractions/simplify-fraction-timed-quiz';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';
import { BaseQuizViewComponent } from 'src/app/shared/components/base-quiz-view/base-quiz-view.component';
import { SimplifyFractionRoundLevel } from 'src/app/core/domain/models/fractions/simplify-fraction-round-level';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simplify-fraction',
  templateUrl: './simplify-fraction.component.html',
  styleUrls: ['./simplify-fraction.component.scss']
})
export class SimplifyFractionComponent extends BaseQuizViewComponent implements OnInit {

  private answerNum = new FormControl('');
  private answerDen = new FormControl('');
  @ViewChild('numeratorInput', { static: false }) numInput: ElementRef;

  constructor(public statsService: StatsService, public route: ActivatedRoute) {
    super(statsService, route);
  }

  ngOnInit() {
    this.quizName = QUIZ_NAMES[9]; // 'simplify-fraction'
    this.levelOrder = SIMPLIFY_FRACTION_LEVEL_ORDER;
    this.quiz = new SimplifyFractionTimedQuiz(new Seconds(60), 0,
      this.levelOrder as SimplifyFractionRoundLevel[], this.quizName,
      // beforeTimerStart():
      () => {
        this.setUI();
        this.setFocus();
      },
      // beforeEvaluateRound():
      () => {
        this.resetUI();
      },
      // afterEvaluateRound():
      (stats: Stats) => {
        this.sendStats(stats);
      },
      this.displayEvaluationMessages
    );
    this.resetUI();
    this.getMaxLevels();
  }

  onEnter() {
    if (!this.answerDisabled && this.answerIsValid()) {
      const answer = this.answerNum.value + SimplifyFractionTimedQuiz.ANSWER_DELIMITER + this.answerDen.value;
      this.quiz.answerQuestion(answer);
      this.clearAnswerInput();
    }
  }

  onSkip() {
    if (!this.answerDisabled) {
      this.quiz.skipQuestion();
      if (this.quiz.currentRound.skipsRemaining === 0) {
        this.skipsDisabled = true;
      }
      this.clearAnswerInput();
    }
  }

  answerIsValid(): boolean {
    return this.answerNum.value && this.answerDen.value &&
      BaseQuizViewComponent.validAnswerRegex.test(this.answerNum.value) &&
      BaseQuizViewComponent.validAnswerRegex.test(this.answerDen.value);
  }

  clearAnswerInput() {
    this.answerNum.setValue('');
    this.answerDen.setValue('');
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      if (this.numInput) {
        this.numInput.nativeElement.focus();
      }
    }, 0);
  }
}
