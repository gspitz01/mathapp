import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'src/app/core/domain/models/user';
import { Stats } from 'src/app/core/domain/models/stats';
import { OPERATORS_DB_MAP } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.scss']
})
export class StatsUserComponent implements OnInit {
  @Input() user: Observable<User>;
  @Input() userStats: Observable<Stats[]>;

  constructor() {}

  ngOnInit() {}

  displayOperator(dbNumber: number): string {
    if (OPERATORS_DB_MAP[dbNumber]) {
      return OPERATORS_DB_MAP[dbNumber].display;
    }
    return '';
  }
}
