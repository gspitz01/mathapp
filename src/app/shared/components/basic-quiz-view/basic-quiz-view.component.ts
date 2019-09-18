import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { Stats } from 'src/app/core/domain/models/stats';
import { BasicTimedQuiz } from 'src/app/core/domain/models/basics/basic-timed-quiz';
import { BaseQuizViewComponent } from '../base-quiz-view/base-quiz-view.component';
import { BasicRoundLevel } from 'src/app/core/domain/models/basics/basic-round-level';
import { ActivatedRoute } from '@angular/router';
import { GCF, LCM, EXPONENTIATION } from 'src/app/core/domain/models/basics/basic-operators';
import { Operator } from 'src/app/core/domain/models/operator';


@Component({
  selector: 'app-basic-quiz-view',
  templateUrl: './basic-quiz-view.component.html',
  styleUrls: ['./basic-quiz-view.component.scss']
})
export class BasicQuizViewComponent extends BaseQuizViewComponent implements OnInit {

  private answer = new FormControl('');
  @ViewChild('answerInp', { static: false }) answerInput: ElementRef;

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
    this.quiz = new BasicTimedQuiz(this.startingTime, this.startingLevel,
      this.levelOrder as BasicRoundLevel[], this.quizName,
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
      this.quiz.answerQuestion(this.answer.value);
      this.clearAnswerInput();
    }
  }

  answerIsValid(): boolean {
    return this.answer.value && BaseQuizViewComponent.validAnswerRegex.test(this.answer.value);
  }

  /**
   * Skipping a question sends * as the answer
   */
  onSkip() {
    if (!this.answerDisabled) {
      this.quiz.skipQuestion();
      if (this.quiz.currentRound.skipsRemaining === 0) {
        this.skipsDisabled = true;
      }
      this.clearAnswerInput();
    }
  }

  setFocus() {
    setTimeout(() => {
      if (this.answerInput) {
        this.answerInput.nativeElement.focus();
      }
    }, 0);
  }

  clearAnswerInput() {
    this.answer.setValue('');
    this.setFocus();
  }

  isGcfQuestion(): boolean {
    return this.isOperator(GCF);
  }

  isLcmQuestion(): boolean {
    return this.isOperator(LCM);
  }

  isExpQuestion(): boolean {
    return this.isOperator(EXPONENTIATION);
  }

  isOperator(operator: Operator): boolean {
    if (this.quiz.currentRound.getCurrentQuestion() &&
      this.quiz.currentRound.getCurrentQuestion().operator === operator) {
        return true;
    }
    return false;
  }
}
