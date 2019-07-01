import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { of, BehaviorSubject } from 'rxjs';

import { AuthComponent } from './auth.component';
import { SecurityService } from '../core/services/security.service';
import { StatsService } from '../core/services/stats.service';

describe('AuthComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const statsServiceSpy = jasmine.createSpyObj('StatsService', ['getAdminSnapshot']);
  const authState = {
    uid: '34hjjk234'
  };
  const admin = {
    key: authState.uid
  };
  statsServiceSpy.getAdminSnapshot.and.returnValue(of(admin));
  const securityServiceSpy = jasmine.createSpyObj('SecurityService',
    ['getAuthState', 'logout', 'loggedIn', 'currentUserDisplayName']);
  securityServiceSpy.getAuthState.and.returnValue(of(authState));
  const currentUserName = 'Billy Bob';
  securityServiceSpy.currentUserDisplayName.and.returnValue(of(currentUserName));
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loggedInSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    loggedInSubject = new BehaviorSubject(false);
    securityServiceSpy.loggedIn.and.returnValue(loggedInSubject);
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      providers: [
        { provide: SecurityService, useValue: securityServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: StatsService, useValue: statsServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login link if not logged in', () => {
    fixture.whenStable().then(() => {
      const login = fixture.debugElement.query(By.css('.login'));
      expect(login.nativeElement).toBeTruthy();
    });
  });

  it('should logout and navigate to login on logout click', () => {
    // Trigger login
    loggedInSubject.next(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const logout = fixture.debugElement.query(By.css('.logout'));
      logout.nativeElement.click();

      expect(securityServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    });
  });

  it('should show current user name if logged in', () => {
    securityServiceSpy.currentUserDisplayName.and.returnValue(of(currentUserName));
    // Trigger login
    loggedInSubject.next(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const currentUser = fixture.debugElement.query(By.css('.current-user'));
      expect(currentUser.nativeElement.textContent).toContain(currentUserName);
    });
  });

  it('should show stats link if admin', () => {
    // Trigger Login
    loggedInSubject.next(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const statsLink = fixture.debugElement.query(By.css('.stats'));
      expect(statsLink.nativeElement).toBeTruthy();
    });
  });

  it('should not show stats link if not admin', () => {
    // Login starts out as false, so even though the admin credentials are right,
    // admin should be false without further setup
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const statsLink = fixture.debugElement.query(By.css('.stats'));
      expect(statsLink).toBeFalsy();
    });
  });
});
