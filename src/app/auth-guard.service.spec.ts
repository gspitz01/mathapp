import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

class MockAngularFireAuth {
  authState = {
    subscribe: function() {

    }
  }
}

class MockRouter {

}

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: Router, useClass: MockRouter }
      ]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
