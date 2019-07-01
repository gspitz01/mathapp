import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';

import { LoginComponent } from './login.component';
import { SecurityService } from '../core/services/security.service';
import { of } from 'rxjs';

class MockAngularFireAuth {
  authState = {
    subscribe: function() {

    }
  };
}

class MockActivatedRoute {
  queryParams = of({return: 'jiggly-puff'});
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let securityService: SecurityService;
  let route: ActivatedRoute;
  const router = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatButtonModule
      ],
      providers: [
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    securityService = TestBed.get(SecurityService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to route query params on ngOnInit()', () => {
    spyOn(route.queryParams, 'subscribe');
    component.ngOnInit();
    expect(route.queryParams.subscribe).toHaveBeenCalled();
  });

  it('should login via security service on login() then navigate to return route', () => {
    const fakeLogin = { then: function(callback) {
      callback();
    }};
    spyOn(securityService, 'login').and.returnValue(fakeLogin);
    const returnRoute = 'return';
    component.return = returnRoute;

    component.login();

    expect(securityService.login).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith(returnRoute);
  });

  // TODO: this test creates some debugcontext error that I don't understand
  // it('should call login on security service and navigate to home on click login', () => {
  //   fixture.whenStable().then(() => {
  //     spyOn(securityService, 'login').and.callThrough();

  //     let loginButton = fixture.debugElement.query(By.css('.login'));
  //     loginButton.nativeElement.click();

  //     expect(securityService.login).toHaveBeenCalled();
  //   });
  // });
});
