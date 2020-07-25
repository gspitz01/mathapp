import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { SecurityService } from './security.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';


describe('AuthGuardService', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const ssSpy = jasmine.createSpyObj('SecurityService', ['loggedIn']);
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: SecurityService, useValue: ssSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuardService = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return true from canActivate if security is authenticated', () => {
    ssSpy.loggedIn.and.returnValue(of(true));
    authGuardService.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).pipe(first()).subscribe(canActivate => {
      expect(canActivate).toBeTruthy();
    });
  });

  it('should return false and call navigate on router if security not authenticated', () => {
    ssSpy.loggedIn.and.returnValue(of(false));
    const stateUrl = 'twentyTwo';
    const state = {url: stateUrl };

    authGuardService.canActivate({} as ActivatedRouteSnapshot, state as RouterStateSnapshot).pipe(first()).subscribe(canActivate => {
      expect(canActivate).toBeFalsy();
      const parameter1 = ['login'];
      const parameter2 = { queryParams: { return: stateUrl }};
      expect(routerSpy.navigate).toHaveBeenCalledWith(parameter1, parameter2);
    });
  });
});
