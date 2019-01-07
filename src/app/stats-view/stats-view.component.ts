import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StatsService } from '../core/services/stats.service';
import { SecurityService } from '../core/services/security.service';
import { User } from '../shared/models/user';
import { Stats } from '../shared/models/stats';

@Component({
  selector: 'app-stats-view',
  templateUrl: './stats-view.component.html',
  styleUrls: ['./stats-view.component.scss']
})
export class StatsViewComponent implements OnInit {
  users: Observable<User[]>;
  selectedUsers: Observable<User[]>;
  userStats: Observable<Stats[]>;

  constructor(private securityService: SecurityService,
    private statsService: StatsService,
    private route: ActivatedRoute) {

    }

  ngOnInit() {
    this.statsService.getAdmin().subscribe(admin => {
      if (admin.key) {
        this.users = this.statsService.getAllUsers();
        this.route.paramMap.subscribe((params: ParamMap) => {
          this.userStats = this.statsService.getStats(params.get('id'));
          this.selectedUsers = this.users.pipe(
            map(users => users.filter(user =>
                user.id === params.get('id')))
          );
        });
      }
    })
  }
}
