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
  let authStateSubject: BehaviorSubject<any>;
  const currentUserName = 'Billy Bob';
  securityServiceSpy.currentUserDisplayName.and.returnValue(of(currentUserName));
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loggedInSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    authStateSubject = new BehaviorSubject(authState);
    securityServiceSpy.getAuthState.and.returnValue(authStateSubject);
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

  it('should show login link if not logged in', (done) => {
    fixture.whenStable().then(() => {
      const login = fixture.debugElement.query(By.css('.login'));
      expect(login.nativeElement).toBeTruthy();
      done();
    });
  });

  it('should logout and navigate to login on logout click', (done) => {
    // Trigger login
    loggedInSubject.next(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const logout = fixture.debugElement.query(By.css('.logout'));
      logout.nativeElement.click();

      expect(securityServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
      done();
    });
  });

  it('should show current user name if logged in', (done) => {
    securityServiceSpy.currentUserDisplayName.and.returnValue(of(currentUserName));
    // Trigger login
    loggedInSubject.next(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const currentUser = fixture.debugElement.query(By.css('.current-user'));
      expect(currentUser.nativeElement.textContent).toContain(currentUserName);
      done();
    });
  });

  it('should show stats link if admin', (done) => {
    // Trigger Login
    loggedInSubject.next(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const statsLink = fixture.debugElement.query(By.css('.stats'));
      expect(statsLink.nativeElement).toBeTruthy();
      done();
    });
  });

  it('should not show stats link if not admin', (done) => {
    // Login starts out as false, so even though the admin credentials are right,
    // admin should be false without further setup
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const statsLink = fixture.debugElement.query(By.css('.stats'));
      expect(statsLink).toBeFalsy();
      done();
    });
  });

  it('should have isAdmin false if logged in but admin null', (done) => {
    securityServiceSpy.currentUserDisplayName.and.returnValue(of(currentUserName));
    loggedInSubject.next(true);
    authStateSubject.next(null);
    component.isAdmin.subscribe(isAdmin => {
      expect(isAdmin).toBeFalsy();
      done();
    });
  });

  it('should have isAdmin false if logged in but admin not correct', (done) => {
    securityServiceSpy.currentUserDisplayName.and.returnValue(of(currentUserName));
    loggedInSubject.next(true);
    authStateSubject.next({uid: 'something wrong'});
    component.isAdmin.subscribe(isAdmin => {
      expect(isAdmin).toBeFalsy();
      done();
    });
  });
});
