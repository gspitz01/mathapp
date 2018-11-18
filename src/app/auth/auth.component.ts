import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  currentUrl: string[] = [];
  isAdmin = false;

  constructor(private security: SecurityService,
    private router: Router,
    private statsService: StatsService) { }

  ngOnInit() {
    this.security.getAuthState().subscribe(authState => {
      if (authState) {
        this.statsService.getAdminSnapshot().subscribe(admin => {
          if (admin.key === authState.uid) {
            this.isAdmin = true;
          }
        });
      }
    });
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
