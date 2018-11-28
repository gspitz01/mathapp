import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { MatListModule } from '@angular/material';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { GreatestCommonFactorComponent } from './greatest-common-factor.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { MockAngularFireDataBase, MockAngularFireAuth } from '../test-constants';
import { By } from '@angular/platform-browser';

describe('GreatestCommonFactorComponent', () => {
  let component: GreatestCommonFactorComponent;
  let fixture: ComponentFixture<GreatestCommonFactorComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GreatestCommonFactorComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatestCommonFactorComponent);
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

  it('should display "Level: Easy Greatest Common Factor"', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain("Easy Greatest Common Factor");
  });

  it('after start clicked, time should display', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let timeRemainingView = fixture.debugElement.query(By.css(".time-remaining"));
      expect(timeRemainingView.nativeElement.textContent).toBe('60');
    });
  });

  it('jump to level with click on level name', () => {
    fixture.whenStable().then(() => {
      fixture.debugElement.query(By.css('.jump-to-level-button')).nativeElement.click();
      fixture.detectChanges();
      let easyFivesLevelButton = fixture.debugElement.query(By.css("#hard-greatest-common-factor"));
      easyFivesLevelButton.nativeElement.click();
      fixture.detectChanges();

      let levelDisplay = fixture.debugElement.query(By.css('.level'));
      expect(levelDisplay.nativeElement.textContent).toContain('Hard Greatest Common Factor');
    });
  });
});
