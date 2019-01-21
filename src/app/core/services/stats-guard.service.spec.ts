import { TestBed, inject } from '@angular/core/testing';

import { StatsGuardService } from './stats-guard.service';
import { Router } from '@angular/router';
import { StatsService } from './stats.service';

describe('StatsGuardService', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const ssSpy = jasmine.createSpyObj('StatsService', ['isAdmin']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsGuardService,
        { provide: Router, useValue: routerSpy },
        { provide: StatsService, useValue: ssSpy }
      ]
    });
  });

  it('should be created', inject([StatsGuardService], (service: StatsGuardService) => {
    expect(service).toBeTruthy();
  }));
});
