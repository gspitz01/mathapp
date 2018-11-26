import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatListModule } from '@angular/material';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { BasicAdditionComponent } from './basic-addition.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ADDITION } from '../basic-operators';
import { MockAngularFireDataBase, MockAngularFireAuth } from '../test-constants';

describe('BasicAdditionComponent', () => {
  let component: BasicAdditionComponent;
  let fixture: ComponentFixture<BasicAdditionComponent>;
  let startButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicAdditionComponent,
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
    fixture = TestBed.createComponent(BasicAdditionComponent);
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

  it('should display "Easy Addition"', () => {
    let levelDisplay = fixture.debugElement.query(By.css(".level"));
    expect(levelDisplay.nativeElement.textContent).toContain("Easy Addition");
  });

  it('after start clicked, should display addition operator', () => {
    fixture.whenStable().then(() => {
      startButton.nativeElement.click();
      fixture.detectChanges();
      let operatorView = fixture.debugElement.query(By.css(".operator"));
      expect(operatorView.nativeElement.textContent).toBe(ADDITION.display);
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
