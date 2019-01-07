import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { AuthComponent } from './auth.component';
import { SecurityService } from '../core/services/security.service';
import { StatsService } from '../core/services/stats.service';

// TODO: add tests for not Admin, change to use jasmine-marbles

describe('AuthComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const statsServiceSpy = jasmine.createSpyObj('StatsService', ['getAdminSnapshot']);
  const authState = {
    uid: "34hjjk234"
  };
  const admin = {
    key: authState.uid
  }
  statsServiceSpy.getAdminSnapshot.and.returnValue(of(admin));
  const securityServiceSpy = jasmine.createSpyObj('SecurityService',
    ['getAuthState', 'logout', 'authenticated', 'currentUserDisplayName']);
  securityServiceSpy.getAuthState.and.returnValue(of(authState));
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
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
      let login = fixture.debugElement.query(By.css('.login'));
      expect(login.nativeElement).toBeTruthy();
    });
  });

  it('should logout and navigate to login on logout click', () => {
    securityServiceSpy.authenticated.and.returnValue(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let logout = fixture.debugElement.query(By.css(".logout"));
      logout.nativeElement.click();

      expect(securityServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
    });
  });

  it('should show current user name if logged in', () => {
    const currentUserName = "Billy Bob";
    securityServiceSpy.currentUserDisplayName.and.returnValue(currentUserName);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let currentUser = fixture.debugElement.query(By.css('.current-user'));
      expect(currentUser.nativeElement.textContent).toContain(currentUserName);
    });
  });

  it('should show stats link if admin', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let statsLink = fixture.debugElement.query(By.css('.stats'));
      expect(statsLink.nativeElement).toBeTruthy();
    });
  });
});
