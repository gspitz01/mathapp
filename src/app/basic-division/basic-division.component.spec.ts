import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDivisionComponent } from './basic-division.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DIVISION } from '../basic-operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockAngularFireAuth, MockAngularFireDataBase } from '../test-constants';

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
        ReactiveFormsModule
      ],
      providers: [
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
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
