import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { of, BehaviorSubject } from 'rxjs';

import { BasicMultiplicationComponent } from './basic-multiplication.component';
import { BasicQuizViewComponent } from '../../../shared/components/basic-quiz-view/basic-quiz-view.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { MULTIPLICATION } from 'src/app/core/domain/models/basics/basic-operators';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-multiplication-round-levels';
import { ActivatedRoute } from '@angular/router';

fdescribe('BasicMultiplicationComponent', () => {
  let component: BasicMultiplicationComponent;
  let fixture: ComponentFixture<BasicMultiplicationComponent>;
  let startButton: DebugElement;
  const activatedRoute = {roundName: 'threes'};
  const activatedRouteSubject = new BehaviorSubject<any>(activatedRoute);
  const mockActivatedRoute = {
    params: activatedRouteSubject
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicMultiplicationComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: StatsService, useClass: MockStatsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMultiplicationComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css('#start'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('level order should be BASIC MULTIPLICATION', () => {
    expect(component.levelOrder).toBe(BASIC_MULTIPLICATION_LEVEL_ORDER[1]);
  });

  it('quiz name should be basic-multiplication-threes', () => {
    expect(component.quizName).toBe('basic-multiplication-threes');
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe('Start');
  });

  it('should display "Level: Threes"', () => {
    const levelDisplay = fixture.debugElement.query(By.css('.level'));
    expect(levelDisplay.nativeElement.textContent).toContain('Threes');
  });

  fit('should display "Level: Twos" if roundName route param not there', () => {
    activatedRouteSubject.next({});
    fixture = TestBed.createComponent(BasicMultiplicationComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Twos');
    });
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      const operatorView = fixture.debugElement.query(By.css('.operator'));
      expect(operatorView.nativeElement.textContent).toBe(MULTIPLICATION.display);
    });
  });

  it('after start clicked, time should display', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      const timeRemainingView = fixture.debugElement.query(By.css('.time-remaining'));
      expect(timeRemainingView.nativeElement.textContent).toBe('60');
    });
  });

  it('jump to level with click on level name', () => {
    fixture.whenStable().then(() => {
      fixture.debugElement.query(By.css('.jump-to-level-button')).nativeElement.click();
      fixture.detectChanges();
      const easyFivesLevelButton = fixture.debugElement.query(By.css('#hard-multiplication-threes'));
      easyFivesLevelButton.nativeElement.click();
      fixture.detectChanges();

      const levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Hard');
    });
  });
});
