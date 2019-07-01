import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';
import { User } from 'src/app/core/domain/models/user';
import { Stats } from 'src/app/core/domain/models/stats';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/core/services/security.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stats-self',
  templateUrl: './stats-self.component.html',
  styleUrls: ['./stats-self.component.scss']
})
export class StatsSelfComponent implements OnInit {
  user: Observable<User>;
  userStats: Observable<Stats[]>;

  constructor(private statsService: StatsService, private security: SecurityService) {}

  ngOnInit() {
    this.user = this.security.currentUserId().pipe(
      switchMap(userId => {
        return this.security.currentUserDisplayName().pipe(
          map(displayName => {
            // This doesn't actually get all the user metadata, change if that needs to be the case
            return new User(userId, displayName, '', '');
          })
        );
      })
    );
    this.userStats = this.security.currentUserId().pipe(
      switchMap(userId => {
        return this.statsService.getStats(userId);
      })
    );
  }

}
