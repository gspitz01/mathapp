import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { of, BehaviorSubject } from 'rxjs';

import { BasicDivisionComponent } from './basic-division.component';
import { BasicQuizViewComponent } from '../../../shared/components/basic-quiz-view/basic-quiz-view.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { DIVISION } from 'src/app/core/domain/models/basics/basic-operators';
import { BASIC_DIVISION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-division-round-levels';
import { ActivatedRoute } from '@angular/router';

describe('BasicDivisionComponent', () => {
  let component: BasicDivisionComponent;
  let fixture: ComponentFixture<BasicDivisionComponent>;
  let startButton: DebugElement;
  const activatedRoute = {roundName: 'three'};
  let activatedRouteSubject: BehaviorSubject<any>;

  beforeEach(async(() => {
    activatedRouteSubject = new BehaviorSubject<any>(activatedRoute);
    const mockActivatedRoute = {
      params: activatedRouteSubject
    };
    TestBed.configureTestingModule({
      declarations: [
        BasicDivisionComponent,
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
    fixture = TestBed.createComponent(BasicDivisionComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css('#start'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('level order should be BASIC DIVISION', () => {
    expect(component.levelOrder).toBe(BASIC_DIVISION_LEVEL_ORDER[1]);
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe('Start');
  });

  it('should display "By Three"', () => {
    const levelDisplay = fixture.debugElement.query(By.css('.level'));
    expect(levelDisplay.nativeElement.textContent).toContain('By Three');
  });

  it('should display "By Two" if roundName route param not there', () => {
    activatedRouteSubject.next({});
    fixture = TestBed.createComponent(BasicDivisionComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('By Two');
    });
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      const operatorView = fixture.debugElement.query(By.css('.operator'));
      expect(operatorView.nativeElement.textContent).toBe(DIVISION.display);
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
});
