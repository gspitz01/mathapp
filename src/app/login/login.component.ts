import { Component, OnInit, NgZone } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  return: string = "";

  constructor(private security: SecurityService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.return = params['return'] || 'home');
  }

  login() {
    this.security.login().then(() => {
      this.zone.run(() => {
        this.router.navigateByUrl(this.return);
      });
    });
  }

}