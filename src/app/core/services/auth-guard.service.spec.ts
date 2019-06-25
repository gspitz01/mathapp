import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { SecurityService } from './security.service';


describe('AuthGuardService', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const ssSpy = jasmine.createSpyObj('SecurityService', ['authenticated']);
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: SecurityService, useValue: ssSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuardService = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return true from canActivate if security is authenticated', () => {
    ssSpy.authenticated.and.returnValue(true);
    expect(authGuardService.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTruthy();
  });

  it('should return false and call navigate on router if security not authenticated', () => {
    ssSpy.authenticated.and.returnValue(false);
    const stateUrl = 'twentyTwo';
    const state = {url: stateUrl };

    expect(authGuardService.canActivate({} as ActivatedRouteSnapshot, state as RouterStateSnapshot)).toBeFalsy();

    const parameter1 = ['login'];
    const parameter2 = { queryParams: { return: stateUrl }};
    expect(routerSpy.navigate).toHaveBeenCalledWith(parameter1, parameter2);
  });
});
