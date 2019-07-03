import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../core/services/security.service';
import { Router } from '@angular/router';
import { StatsService } from '../core/services/stats.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAdmin: Observable<boolean>;
  loggedIn: Observable<boolean>;
  currentUser: Observable<string>;

  constructor(private security: SecurityService,
    private router: Router,
    private statsService: StatsService) { }

  ngOnInit() {
    this.isAdmin = this.security.getAuthState().pipe(
      switchMap(authState => {
        if (authState) {
          return this.statsService.getAdminSnapshot().pipe(
            map(admin => {
              if (admin.key === authState.uid) {
                return true;
              } else {
                return false;
              }
          }));
        } else {
          return of(false);
        }
      }),
      share()
    );
    this.loggedIn =  this.security.loggedIn().pipe(share());
    this.currentUser = this.security.currentUserDisplayName().pipe(share());
  }

  logout() {
    this.security.logout();
    this.router.navigate(['login']);
  }
}
