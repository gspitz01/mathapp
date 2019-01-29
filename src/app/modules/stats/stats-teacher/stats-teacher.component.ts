import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { Teacher } from 'src/app/core/domain/models/teacher';

@Component({
  selector: 'app-stats-teacher',
  templateUrl: './stats-teacher.component.html',
  styleUrls: ['./stats-teacher.component.scss']
})
export class StatsTeacherComponent implements OnInit {
  @Input() teachers: Observable<Teacher[]>;
  @Input() selectedTeacherId: string;
  @Output() teacherSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }
}
