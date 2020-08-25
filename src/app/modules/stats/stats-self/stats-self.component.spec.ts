import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSelfComponent } from './stats-self.component';
import { StatsUserComponent } from '../stats-user/stats-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { StatsService } from 'src/app/core/services/stats.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { of } from 'rxjs';
import { Stats } from 'src/app/core/domain/models/stats';
import { marbles } from 'rxjs-marbles/jasmine';

const userId = 'UserId01';
const userName = 'Name Uvuser';
const testStats = [new Stats(new Date(), new Date(), 'Roundy Name', 10, null)];
const testStats$ = of(testStats);

function nonTestBedSetup() {
  const nTbStatsService = jasmine.createSpyObj('StatsService', ['getStats']);
  const nTbSecurityService = jasmine.createSpyObj('SecurityService', ['currentUserId', 'currentUserDisplayName']);
  nTbSecurityService.currentUserId.and.returnValue(of(userId));
  nTbSecurityService.currentUserDisplayName.and.returnValue(of(userName));
  nTbStatsService.getStats.and.returnValue(testStats$);
  const nTbComponent = new StatsSelfComponent(nTbStatsService, nTbSecurityService);
  nTbComponent.ngOnInit();
  return {nTbComponent, nTbStatsService, nTbSecurityService};
}

describe('StatsSelfComponent', () => {
  let component: StatsSelfComponent;
  let fixture: ComponentFixture<StatsSelfComponent>;
  const statsService = jasmine.createSpyObj('StatsService', ['getStats']);
  const securityService = jasmine.createSpyObj('SecurityService', ['currentUserId', 'currentUserDisplayName']);
  securityService.currentUserId.and.returnValue(of(userId));
  securityService.currentUserDisplayName.and.returnValue(of(userName));
  statsService.getStats.and.returnValue(testStats$);

  beforeEach(() => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a StatsUserComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).not.toBeNull();
  });

  /* Non-TestBed Tests */

  it('should set user', marbles(m => {
    const {nTbComponent, nTbSecurityService} = nonTestBedSetup();
    const sub = nTbComponent.user.subscribe(user => {
      expect(user.name).toBe(userName);
      expect(user.id).toBe(userId);
      expect(nTbSecurityService.currentUserId).toHaveBeenCalled();
      expect(nTbSecurityService.currentUserDisplayName).toHaveBeenCalled();
      sub.unsubscribe();
    });
  }));

  it('should set userStats', marbles(m => {
    const {nTbComponent} = nonTestBedSetup();
    const subscr = nTbComponent.userStats.subscribe(userStats => {
      expect(userStats).toBe(testStats);
      subscr.unsubscribe();
    });
  }));
});
