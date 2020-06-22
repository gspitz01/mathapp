import { Component, OnInit, NgZone } from '@angular/core';
import { SecurityService } from '../core/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  return = '';

  constructor(private security: SecurityService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone) { }

  ngOnInit() {
    this.return = this.route.snapshot.queryParams['return'] || 'home';
  }

  login() {
    this.security.login().then(() => {
      this.zone.run(() => {
        this.router.navigateByUrl(this.return);
      });
    })
    .catch((error) => {
      console.log('Error code: ' + error.code);
      console.log('Error message: ' + error.message);
      console.log('Email: ' + error.email);
      console.log('Credential: ' + error.credential);
    });
  }

}
