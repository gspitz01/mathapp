import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { Class } from 'src/app/core/domain/models/class';

@Component({
  selector: 'app-stats-class',
  templateUrl: './stats-class.component.html',
  styleUrls: ['./stats-class.component.scss']
})
export class StatsClassComponent implements OnInit {
  @Input() classes: Observable<Class[]>;
  @Input() selectedClassId: string;
  @Output() addClassClick = new EventEmitter<void>();
  @Output() classSelected = new EventEmitter<string>();
  @Output() removeClassClick = new EventEmitter<Class>();

  constructor() { }

  ngOnInit() {}

}
