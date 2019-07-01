import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private security: SecurityService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.security.loggedIn().pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(['login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
    }));
  }
}
