import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-stats-student',
  templateUrl: './stats-student.component.html',
  styleUrls: ['./stats-student.component.scss']
})
export class StatsStudentComponent implements OnInit {
  @Input() students: Observable<User[]>;
  @Input() selectedStudent: User;
  @Output() addStudentClick = new EventEmitter<void>();
  @Output() studentSelected = new EventEmitter<User>();
  @Output() removeStudentClick = new EventEmitter<User>();

  constructor() {}

  ngOnInit() {}

}
