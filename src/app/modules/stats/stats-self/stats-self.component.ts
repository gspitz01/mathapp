import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';
import { User } from 'src/app/core/domain/models/user';
import { Stats } from 'src/app/core/domain/models/stats';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-stats-self',
  templateUrl: './stats-self.component.html',
  styleUrls: ['./stats-self.component.scss']
})
export class StatsSelfComponent implements OnInit {
  user: User;
  userStats: Observable<Stats[]>;

  constructor(private statsService: StatsService, private security: SecurityService) {
    let userId = security.currentUserId();
    // This doesn't actually get all the user metadata, change if that needs to be the case
    this.user = new User(userId, security.currentUserDisplayName(), "", "");
    this.userStats = this.statsService.getStats(userId);
  }

  ngOnInit() {
  }

}
