import { TestBed, inject } from '@angular/core/testing';

import { SecurityService } from './security.service';
import { AngularFireAuth } from 'angularfire2/auth';

class MockAngularFireAuth {
  authState = {
    subscribe: function() {}
  }
}

describe('SecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
      ]
    });
  });

  it('should be created', inject([SecurityService], (service: SecurityService) => {
    expect(service).toBeTruthy();
  }));
});
