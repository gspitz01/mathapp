import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatListModule } from '@angular/material';

import { BasicDivisionComponent } from './basic-division.component';
import { BasicQuizViewComponent } from '../../../shared/components/basic-quiz-view/basic-quiz-view.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { MockStatsService } from 'src/app/core/domain/models/test-constants.spec';
import { DIVISION } from 'src/app/core/domain/models/basics/basic-operators';

describe('BasicDivisionComponent', () => {
  let component: BasicDivisionComponent;
  let fixture: ComponentFixture<BasicDivisionComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
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
        { provide: StatsService, useClass: MockStatsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDivisionComponent);
    component = fixture.componentInstance;
    startButton = fixture.debugElement.query(By.css("#start"));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display start button', () => {
    expect(startButton.nativeElement.textContent).toBe("Start");
  });

  it('should display "By Two"', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain("By Two");
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let operatorView = fixture.debugElement.query(By.css(".operator"));
      expect(operatorView.nativeElement.textContent).toBe(DIVISION.display);
    });
  });

  it('after start clicked, time should display', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let timeRemainingView = fixture.debugElement.query(By.css(".time-remaining"));
      expect(timeRemainingView.nativeElement.textContent).toBe('60');
    });
  });
});
