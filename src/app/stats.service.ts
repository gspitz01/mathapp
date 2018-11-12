import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SecurityService } from './security.service';
import { Stats } from './stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private db: AngularFireDatabase,
    private security: SecurityService) {
  }

  addStats(stats: Stats) {
    if (this.security.authenticated()) {
      let userId = this.security.currentUserId();
      this.db.list('users/' + userId).push({
        startDate: stats.roundStart.getTime(),
        endDate: stats.roundEnd.getTime(),
        name: stats.roundName,
        target: stats.target,
        correct: stats.correct,
        incorrects: stats.incorrects
      });
    }
  }
}
