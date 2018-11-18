import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { SecurityService } from '../security.service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Stats } from '../stats';
import { switchMap, map, filter, takeLast, share } from 'rxjs/operators';

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
