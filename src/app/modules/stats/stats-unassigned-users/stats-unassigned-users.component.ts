import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-stats-unassigned-users',
  templateUrl: './stats-unassigned-users.component.html',
  styleUrls: ['./stats-unassigned-users.component.scss']
})
export class StatsUnassignedUsersComponent implements OnInit {
  @Input() users: Observable<User[]>;
  @Output() userSelected = new EventEmitter<string>();
  @Output() stopAddingUsersClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
