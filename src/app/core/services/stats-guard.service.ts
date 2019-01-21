import { Injectable } from '@angular/core';
import { StatsService } from './stats.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatsGuardService implements CanActivate {

  constructor(private statsService: StatsService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.statsService.isAdmin()) {
        this.router.navigate(['home']);
        return false;
      } else {
        return true;
      }
    }
}
