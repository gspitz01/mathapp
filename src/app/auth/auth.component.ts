import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../core/services/security.service';
import { Router } from '@angular/router';
import { StatsService } from '../core/services/stats.service';
import { Subject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  currentUrl: string[] = [];
  isAdmin: Observable<boolean>;

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
        }
      })
    );
  }

  logout() {
    this.security.logout();
    this.router.navigate(['login']);
  }

  loggedIn(): boolean {
    return this.security.authenticated();
  }

  currentUser(): string {
    return this.security.currentUserDisplayName();
  }
}
