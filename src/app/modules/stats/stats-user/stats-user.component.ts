import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Stats } from 'src/app/shared/models/stats';
import { User } from 'src/app/shared/models/user';

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
