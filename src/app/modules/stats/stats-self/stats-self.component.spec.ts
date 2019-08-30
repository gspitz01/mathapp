import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSelfComponent } from './stats-self.component';
import { StatsUserComponent } from '../stats-user/stats-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { StatsService } from 'src/app/core/services/stats.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { of } from 'rxjs';
import { Stats } from 'src/app/core/domain/models/stats';
import { initTestScheduler, resetTestScheduler } from 'jasmine-marbles';

describe('StatsSelfComponent', () => {
  let component: StatsSelfComponent;
  let fixture: ComponentFixture<StatsSelfComponent>;
  const statsService = jasmine.createSpyObj('StatsService', ['getStats']);
  const securityService = jasmine.createSpyObj('SecurityService', ['currentUserId', 'currentUserDisplayName']);
  const userId = 'UserId01';
  const userName = 'Name Uvuser';
  const testStats = [new Stats(new Date(), new Date(), 'Roundy Name', 10, null)];
  const testStats$ = of();
  securityService.currentUserId.and.returnValue(of(userId));
  securityService.currentUserDisplayName.and.returnValue(of(userName));
  statsService.getStats.and.returnValue(testStats$);

  beforeEach(() => {
    initTestScheduler();
    TestBed.configureTestingModule({
      declarations: [
        StatsSelfComponent,
        StatsUserComponent
      ],
      imports: [
        CoreModule
      ],
      providers: [
        { provide: StatsService, useValue: statsService },
        { provide: SecurityService, useValue: securityService }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(StatsSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    resetTestScheduler();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user', () => {
    // TODO: figure out how to get these checks back
    // expect(securityService.currentUserId).toHaveBeenCalled();
    // expect(securityService.currentUserDisplayName).toHaveBeenCalled();
    component.user.subscribe(user => {
      expect(user.name).toBe(userName);
      expect(user.id).toBe(userId);
    });
  });

  it('should set userStats', () => {
    component.userStats.subscribe(userStats => {
      expect(userStats).toBe(testStats);
    });
  });

  it('should contain a StatsUserComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).not.toBeNull();
  });
});
