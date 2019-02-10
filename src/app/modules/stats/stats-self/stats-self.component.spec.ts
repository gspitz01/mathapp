import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSelfComponent } from './stats-self.component';
import { StatsUserComponent } from '../stats-user/stats-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { StatsService } from 'src/app/core/services/stats.service';
import { SecurityService } from 'src/app/core/services/security.service';

describe('StatsSelfComponent', () => {
  let component: StatsSelfComponent;
  let fixture: ComponentFixture<StatsSelfComponent>;
  const statsService = jasmine.createSpyObj('StatsService', ['getStats']);
  const securityService = jasmine.createSpyObj("SecurityService", ['currentUserId', 'currentUserDisplayName']);

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
});
