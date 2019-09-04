import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { FractionRoundLevel } from '../../../core/domain/models/fractions/fraction-round-level';
import { Stats } from 'src/app/core/domain/models/stats';
import { FractionTimedQuiz } from 'src/app/core/domain/models/fractions/fraction-timed-quiz';
import { BaseQuizViewComponent } from 'src/app/shared/components/base-quiz-view/base-quiz-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fraction-quiz-view',
  templateUrl: './fraction-quiz-view.component.html',
  styleUrls: ['./fraction-quiz-view.component.scss']
})
export class FractionQuizViewComponent extends BaseQuizViewComponent implements OnInit {

  private answerNum = new FormControl('');
  private answerDen = new FormControl('');
  @ViewChild('numeratorInput', { static: false }) numInput: ElementRef;

  constructor(public statsService: StatsService, public route: ActivatedRoute) {
    super(statsService, route);
  }

  ngOnInit() {
    if (this.route.snapshot.data['levelOrder']) {
      // If the router has data for us, use it
      this.retrieveRouteData();
    }
    this.setNewQuiz();
  }

  setNewQuiz() {
    this.quiz = new FractionTimedQuiz(this.startingTime, this.startingLevel,
      this.levelOrder as FractionRoundLevel[], this.quizName,
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
      }
    );
    this.resetUI();
    this.getMaxLevels();

  }

  onEnter() {
    if (!this.answerDisabled && this.answerIsValid()) {
      const answer = this.answerNum.value + FractionTimedQuiz.ANSWER_DELIMITER + this.answerDen.value;
      this.quiz.answerQuestion(answer);
      this.clearAnswerInput();
    }
  }


  /**
   * Skipping means sending "*//*" as the answer
   * (with only one slash but I can't write that in a comment)
   */
  onSkip() {
    if (!this.answerDisabled) {
      this.quiz.answerQuestion('*' + FractionTimedQuiz.ANSWER_DELIMITER + '*');
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
