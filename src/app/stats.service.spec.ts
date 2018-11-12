import { TestBed, inject } from '@angular/core/testing';

import { StatsService } from './stats.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MockAngularFireDataBase, MockAngularFireAuth } from './test-constants';
import { AngularFireAuth } from 'angularfire2/auth';

describe('StatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsService,
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
      ]
    });
  });

  it('should be created', inject([StatsService], (service: StatsService) => {
    expect(service).toBeTruthy();
  }));
});
