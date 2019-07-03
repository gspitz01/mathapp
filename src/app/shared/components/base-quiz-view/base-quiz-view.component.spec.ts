import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQuizViewComponent } from './base-quiz-view.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { BehaviorSubject, of } from 'rxjs';
import { TimedQuiz } from 'src/app/core/domain/models/timed-quiz';
import { BASIC_ADDITION_LEVEL_ORDER } from 'src/app/core/domain/models/round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { Stats } from 'src/app/core/domain/models/stats';

describe('BaseQuizViewComponent', () => {
  let component: BaseQuizViewComponent;
  let fixture: ComponentFixture<BaseQuizViewComponent>;
  const quizName = 'quizName';
  const mockStatsService = jasmine.createSpyObj('StatsService', ['getMaxLevels', 'addStats']);
  const maxLevels = {'quizName': 4};
  let maxLevelsSubject: BehaviorSubject<any>;
  const timeLimitedQuestionRoundSpy = jasmine.createSpyObj('TimeLimited',
    ['tick', 'getTimeRemaining', 'start', 'getNumberOfCorrectAnswers']);
  timeLimitedQuestionRoundSpy.getTimeRemaining.and.returnValue(new Seconds(60));
  timeLimitedQuestionRoundSpy.level = {name: 'Round', questionThresholdPerSixtySeconds: 14};
  class MockTimedQuiz extends TimedQuiz {
    protected newRound() {
      this.currentRound = timeLimitedQuestionRoundSpy;
    }
  }

  beforeEach(async(() => {
    maxLevelsSubject = new BehaviorSubject<any>(maxLevels);
    mockStatsService.getMaxLevels.and.returnValue(maxLevelsSubject);
    mockStatsService.addStats.and.returnValue(of(true));
    TestBed.configureTestingModule({
      declarations: [ BaseQuizViewComponent ],
      providers: [
        { provide: StatsService, useValue: mockStatsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseQuizViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send maxLevels to statsService if currentLevel less than maxLevel', () => {
    component.quizName = quizName;
    component.quiz = new MockTimedQuiz(new Seconds(60), 1, BASIC_ADDITION_LEVEL_ORDER, quizName, () => {}, () => {}, () => {});
    component.getMaxLevels();
    const stats = new Stats(new Date(), new Date(), 'whatever', 15, 3, []);
    component.sendStats(stats);

    expect(mockStatsService.addStats).toHaveBeenCalledWith(stats, null);
  });

  it('should not set quiz current level if timer is running', () => {
    component.quizName = quizName;
    const level = 1;
    component.quiz = new MockTimedQuiz(new Seconds(60), level, BASIC_ADDITION_LEVEL_ORDER, quizName, () => {}, () => {}, () => {});
    component.quiz.startTimer();
    component.getMaxLevels();
    component.quiz.stopTimer();
    expect(component.quiz.currentLevel).toBe(level);
  });
});
