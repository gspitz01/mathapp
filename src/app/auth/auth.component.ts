import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  currentUrl: string[] = [];

  constructor(private security: SecurityService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.security.logout();
    if (this.router.url !== '/home') {
      this.router.navigate(['login']);
    }
  }

  loggedIn(): boolean {
    return this.security.authenticated();
  }

  currentUser(): string {
    return this.security.currentUserDisplayName();
  }

}
