import { TestBed } from '@angular/core/testing';

import { StatsGuardService } from './stats-guard.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StatsService } from './stats.service';

describe('StatsGuardService', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const ssSpy = jasmine.createSpyObj('StatsService', ['isAdmin']);

  let service: StatsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsGuardService,
        { provide: Router, useValue: routerSpy },
        { provide: StatsService, useValue: ssSpy }
      ]
    });

    service = TestBed.get(StatsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true on canActivate if is admin', () => {
    ssSpy.isAdmin.and.returnValue(true);
    expect(service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTruthy();
    expect(ssSpy.isAdmin).toHaveBeenCalled();
  });

  it('should return false and navigate to home if not admin', () => {
    ssSpy.isAdmin.and.returnValue(false);
    expect(service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeFalsy();
    expect(ssSpy.isAdmin).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
});
