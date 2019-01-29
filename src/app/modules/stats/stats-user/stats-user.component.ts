import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'src/app/core/domain/models/user';
import { Stats } from 'src/app/core/domain/models/stats';

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.scss']
})
export class StatsUserComponent implements OnInit {
  @Input() user: User;
  @Input() userStats: Observable<Stats[]>;

  constructor() {}

  ngOnInit() {}
}
