import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BasicTimeLimitedRound } from '../../../shared/models/basic-time-limited-round';
import { Seconds } from '../../../shared/models/seconds';
import { BasicRoundLevel } from '../../../shared/models/basic-round-level';
import { ADVANCE_TO_NEXT_LEVEL_TEXT, FINISHED_HIGHEST_LEVEL_TEXT,
  NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT, WRONG_ANSWER_TEXT } from '../../../shared/models/constants';
import { StatsService } from '../../../core/services/stats.service';
import { Stats } from '../../../shared/models/stats';
import { BasicOperatorQuestion } from '../../../shared/models/basic-operator-question';

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
  buttonText: string;
  messages: string;
  timeLeft: number;
  round: BasicTimeLimitedRound;
  currentLevel: number;
  // Timer for saving window.setInterval id
  private timer: number;
  private answer = new FormControl("");
  private answerDisabled: boolean;
  @ViewChild('answerInp') answerInput: ElementRef;
  // Data for stats service
  private roundStart: Date;
  private incorrects: number[][];

  // Whether or not to show the jump to level links
  showJumpToLevelLinks = false;

  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.buttonText = startButtonText;
    this.currentLevel = this.startingLevel;
    this.timeLeft = this.startingTime.value;
    this.timer = null;
    this.answerDisabled = true;
  }

  newRound() {
    this.round = new BasicTimeLimitedRound(this.startingTime, this.levelOrder[this.currentLevel]);
  }

  start() {
    this.messages = "";
    if (this.timer != null) {
      // If the timer isn't null, it's running, stop it
      window.clearInterval(this.timer);
      this.buttonText = startButtonText;
      this.timer = null;
      this.answerDisabled = true;
      this.evauluateRound();
    } else {
      // timer not yet running, start the round
      this.roundStart = new Date();
      this.incorrects = [];
      this.newRound();
      this.timeLeft = this.round.getTimeRemaining().value;
      this.round.start();
      this.clearAnswerInput();
      this.buttonText = stopButtonText;
      this.answerDisabled = false;
      if (this.answerInput) {
        this.answerInput.nativeElement.focus();
      }
      let that = this;
      this.timer = window.setInterval(function() {
        that.round.tick();
        let timeLeft = that.round.getTimeRemaining().value;
        that.timeLeft = timeLeft;
        if (timeLeft <= 0) {
          window.clearInterval(that.timer);
          that.timer = null;
          that.answerDisabled = true;
          that.buttonText = startButtonText;
          that.evauluateRound();
        }
      }, 1000);
    }
  }

  onEnter() {
    if (!this.answerDisabled && this.answerIsValid()) {
      let answerEval = this.round.answerQuestion(this.answer.value);
      if (answerEval.correct) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
      this.clearAnswerInput();
    }
  }

  private rightAnswer() {
    this.messages = "";
  }

  private wrongAnswer() {
    let question = this.round.getCurrentQuestion() as BasicOperatorQuestion;
    this.incorrects.push([question.operand1.value, question.operand2.value, this.answer.value]);
    this.messages = WRONG_ANSWER_TEXT;
  }

  answerIsValid(): boolean {
    return validAnswerRegex.test(this.answer.value);
  }

  clearAnswerInput() {
    this.answer.setValue("");
  }

  evauluateRound() {
    this.clearAnswerInput();
    let questionsAnswered = this.round.getNumberOfQuestionsAnswered();

    // Send stats to StatsService
    this.sendStats(questionsAnswered);

    let round = this.levelOrder[this.currentLevel];
    let questionThreshold = Math.floor(round.questionThresholdPerSixtySeconds * this.startingTime.value/60);
    if (questionsAnswered >= questionThreshold) {
        if (this.currentLevel < this.levelOrder.length - 1) {
          this.currentLevel++;
          this.messages = ADVANCE_TO_NEXT_LEVEL_TEXT;
        } else {
          this.messages = FINISHED_HIGHEST_LEVEL_TEXT;
        }
    } else {
      this.messages = NOT_ENOUGH_QUESTIONS_TO_ADVANCE_TEXT;
    }
  }

  private sendStats(questionsAnswered: number) {
    let roundStats = new Stats(this.roundStart, new Date(), this.round.level.name,
      this.round.level.questionThresholdPerSixtySeconds, questionsAnswered, this.incorrects);
    this.statsService.addStats(roundStats);
  }
}
