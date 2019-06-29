import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { Stats } from 'src/app/core/domain/models/stats';
import { BasicTimedQuiz } from 'src/app/core/domain/models/basics/basic-timed-quiz';
import { BaseQuizViewComponent } from '../base-quiz-view/base-quiz-view.component';
import { BasicRoundLevel } from 'src/app/core/domain/models/basics/basic-round-level';


@Component({
  selector: 'app-basic-quiz-view',
  templateUrl: './basic-quiz-view.component.html',
  styleUrls: ['./basic-quiz-view.component.scss']
})
export class BasicQuizViewComponent extends BaseQuizViewComponent implements OnInit {

  private answer = new FormControl('');
  @ViewChild('answerInp', { static: false }) answerInput: ElementRef;

  constructor(public statsService: StatsService) {
    super(statsService);
  }

  ngOnInit() {
    this.quiz = new BasicTimedQuiz(this.startingTime, this.startingLevel,
      this.levelOrder as BasicRoundLevel[], this.quizName,
      // beforeTimerStart():
      () => {
        this.setUI();
        if (this.answerInput) {
          this.answerInput.nativeElement.focus();
        }
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
      this.quiz.answerQuestion(this.answer.value);
      this.clearAnswerInput();
    }
  }

  answerIsValid(): boolean {
    return this.answer.value && BaseQuizViewComponent.validAnswerRegex.test(this.answer.value);
  }

  clearAnswerInput() {
    this.answer.setValue('');
  }
}
