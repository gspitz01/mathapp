import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSelfComponent } from './stats-self.component';
import { StatsUserComponent } from '../stats-user/stats-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { StatsService } from 'src/app/core/services/stats.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { of } from 'rxjs';
import { Stats } from 'src/app/core/domain/models/stats';

describe('StatsSelfComponent', () => {
  let component: StatsSelfComponent;
  let fixture: ComponentFixture<StatsSelfComponent>;
  const statsService = jasmine.createSpyObj('StatsService', ['getStats']);
  const securityService = jasmine.createSpyObj("SecurityService", ['currentUserId', 'currentUserDisplayName']);
  const userId = "UserId01";
  const userName = "Name Uvuser";
  const testStats = of([new Stats(new Date(), new Date(), "Roundy Name", 10, 4, null)]);
  securityService.currentUserId.and.returnValue(userId);
  securityService.currentUserDisplayName.and.returnValue(userName);
  statsService.getStats.and.returnValue(testStats);

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user', () => {
    expect(securityService.currentUserId).toHaveBeenCalled();
    expect(securityService.currentUserDisplayName).toHaveBeenCalled();
    expect(component.user.id).toBe(userId);
    expect(component.user.name).toBe(userName);
  });

  it('should set userStats', () => {
    expect(component.userStats).toBe(testStats);
  });

  it('should contain a StatsUserComponent', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-stats-user')).not.toBeNull();
  });
});
