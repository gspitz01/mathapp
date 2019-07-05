import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StatsService } from '../../../core/services/stats.service';
import { Stats } from 'src/app/core/domain/models/stats';
import { BasicTimedQuiz } from 'src/app/core/domain/models/basics/basic-timed-quiz';
import { BaseQuizViewComponent } from '../base-quiz-view/base-quiz-view.component';
import { BasicRoundLevel } from 'src/app/core/domain/models/basics/basic-round-level';
import { ActivatedRoute } from '@angular/router';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { PLURAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';


@Component({
  selector: 'app-basic-quiz-view',
  templateUrl: './basic-quiz-view.component.html',
  styleUrls: ['./basic-quiz-view.component.scss']
})
export class BasicQuizViewComponent extends BaseQuizViewComponent implements OnInit {

  @Input() title: string;
  private answer = new FormControl('');
  @ViewChild('answerInp', { static: false }) answerInput: ElementRef;

  constructor(public statsService: StatsService, private route: ActivatedRoute) {
    super(statsService);
  }

  ngOnInit() {
    if (this.route.snapshot.data['levelOrder']) {
      // If the router has data for us, use it
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
      this.setNewQuiz();
    } else {
      // If the router doesn't have data, assume it was set as component inputs
      this.setNewQuiz();
    }
  }

  setNewQuiz() {
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
