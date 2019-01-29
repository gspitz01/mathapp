import { Component, OnInit } from '@angular/core';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { BASIC_DIVISION_LEVEL_ORDER } from 'src/app/core/domain/models/basic-division-round-levels';

@Component({
  selector: 'app-basic-division',
  templateUrl: './basic-division.component.html',
  styleUrls: ['./basic-division.component.scss']
})
export class BasicDivisionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = BASIC_DIVISION_LEVEL_ORDER;
  quizName = "basic-division";

  constructor() { }

  ngOnInit() {
  }

}
