import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponentiationComponent } from './exponentiation.component';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasicQuizViewComponent } from 'src/app/shared/components/basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material';
import { StatsService } from 'src/app/core/services/stats.service';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { ActivatedRoute } from '@angular/router';
import { EXPONENTIATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/exponentiation-round-levels';
import { By } from '@angular/platform-browser';
import { EXPONENTIATION } from 'src/app/core/domain/models/basics/basic-operators';

describe('ExponentiationComponent', () => {
  let component: ExponentiationComponent;
  let fixture: ComponentFixture<ExponentiationComponent>;
  let startButton: DebugElement;
  const activatedRoute = {roundName: 'third'};
  let activatedRouteSubject: BehaviorSubject<any>;

  beforeEach(async(() => {
    activatedRouteSubject = new BehaviorSubject<any>(activatedRoute);
    const mockActivatedRoute = {
      params: activatedRouteSubject
    };
    TestBed.configureTestingModule({
      declarations: [
        ExponentiationComponent,
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
    fixture = TestBed.createComponent(ExponentiationComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css('#start'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('level order should be EXPONENTIATION', () => {
    expect(component.levelOrder).toBe(EXPONENTIATION_LEVEL_ORDER[1]);
  });

  it('quiz name should be basic-multiplication-threes', () => {
    expect(component.quizName).toBe('exponentiation-third');
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe('Start');
  });

  it('should display "Level: Third Power"', () => {
    const levelDisplay = fixture.debugElement.query(By.css('.level'));
    expect(levelDisplay.nativeElement.textContent).toContain('Third Power');
  });

  it('should display "Level: Second" if roundName route param not there', () => {
    activatedRouteSubject.next({});
    fixture = TestBed.createComponent(ExponentiationComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Second Power');
    });
  });

  it('after start clicked, should display exponentiation operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      const operatorView = fixture.debugElement.query(By.css('.operator'));
      expect(operatorView.nativeElement.textContent).toBe(EXPONENTIATION.display);
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
      const easyFivesLevelButton = fixture.debugElement.query(By.css('#hard-exponentiation-to-the-third-power'));
      easyFivesLevelButton.nativeElement.click();
      fixture.detectChanges();

      const levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Hard');
    });
  });
});
