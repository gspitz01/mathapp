import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { StatsUserComponent } from './stats-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { User } from 'src/app/core/domain/models/user';
import { Stats } from 'src/app/core/domain/models/stats';
import { QuestionStats } from 'src/app/core/domain/models/question-stats';
import { QuestionSuccess } from 'src/app/core/domain/models/question-success';
import { OPERATORS_DB_MAP } from 'src/app/core/domain/models/constants';

describe('StatsUserComponent', () => {
  let component: StatsUserComponent;
  let fixture: ComponentFixture<StatsUserComponent>;
  const testUser = new User('someId', 'John Name', 'Name', null);
  const testUser$ = of(testUser);
  const testQuestions = [new QuestionStats(QuestionSuccess.Correct, 0, [4, 5], [])];
  const testUserStats = [new Stats(new Date(), new Date(), 'Whatever', 10, testQuestions)];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsUserComponent ],
      imports: [
        CoreModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsUserComponent);
    component = fixture.componentInstance;
    component.user = testUser$;
    component.userStats = of(testUserStats);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user name', (done) => {
    fixture.whenStable().then(() => {
      const userNameElement = fixture.debugElement.query(By.css('h2'));
      expect(userNameElement.nativeElement.textContent).toContain(testUser.name);
      done();
    });
  });

  it('should show user stats', () => {
    const pipe = new DatePipe('en');
    const tableDatas = fixture.debugElement.queryAll(By.css('td'));
    expect(tableDatas.length).toBe(7);
    expect(tableDatas[0].nativeElement.textContent).toBe(testUserStats[0].roundName);
    expect(tableDatas[1].nativeElement.textContent).toContain(pipe.transform(testUserStats[0].roundStart, 'short'));
    expect(tableDatas[1].nativeElement.textContent).toContain(pipe.transform(testUserStats[0].roundEnd, 'short'));
    expect(tableDatas[2].nativeElement.textContent).toBe(testUserStats[0].target.toString());
  });

  it('should return QuestionSuccess value on displaySuccess()', () => {
    expect(component.displaySuccess(0)).toBe(QuestionSuccess[0]);
  });

  it('should return empty string if number not in OPERATORS_DB_MAP on displayOperator()', () => {
    expect(component.displayOperator(-1)).toBe('');
  });

  it('should return correct display for operator on displayOperator()', () => {
    expect(component.displayOperator(0)).toBe(OPERATORS_DB_MAP[0].display);
  });
});
