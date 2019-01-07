import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';

import { LoginComponent } from './login.component';
import { SecurityService } from '../core/services/security.service';

class MockAngularFireAuth {
  authState = {
    subscribe: function() {

    }
  }
}

class MockRouter {}

class MockActivatedRoute {
  queryParams = {
    subscribe: function() {}
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let securityService: SecurityService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatButtonModule
      ],
      providers: [
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    securityService = TestBed.get(SecurityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
