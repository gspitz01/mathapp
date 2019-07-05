import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeastCommonMultipleComponent } from './least-common-multiple.component';
import { DebugElement } from '@angular/core';
import { BasicQuizViewComponent } from 'src/app/shared/components/basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material';
import { StatsService } from 'src/app/core/services/stats.service';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { By } from '@angular/platform-browser';
import { LCM_LEVEL_ORDER } from 'src/app/core/domain/models/basics/lcm-round-levels';

describe('LeastCommonMultipleComponent', () => {
  let component: LeastCommonMultipleComponent;
  let fixture: ComponentFixture<LeastCommonMultipleComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeastCommonMultipleComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: StatsService, useClass: MockStatsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeastCommonMultipleComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css('#start'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('level order should be GREATEST COMMON FACTOR', () => {
    expect(component.levelOrder).toBe(LCM_LEVEL_ORDER);
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe('Start');
  });

  it('should display "Level: Easy Least Common Multiple"', () => {
    const levelDisplay = fixture.debugElement.query(By.css('.level'));
    expect(levelDisplay.nativeElement.textContent).toContain('Easy Least Common Multiple');
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
      const easyFivesLevelButton = fixture.debugElement.query(By.css('#hard-least-common-multiple'));
      easyFivesLevelButton.nativeElement.click();
      fixture.detectChanges();

      const levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Hard Least Common Multiple');
    });
  });
});
