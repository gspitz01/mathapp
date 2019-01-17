import { Component, OnInit } from '@angular/core';
import { Seconds } from '../../../shared/models/seconds';
import { FRACTION_DIVISION_LEVEL_ORDER } from '../models/fraction-round-levels';

@Component({
  selector: 'app-fraction-division',
  templateUrl: './fraction-division.component.html',
  styleUrls: ['./fraction-division.component.scss']
})
export class FractionDivisionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_DIVISION_LEVEL_ORDER;
  quizName = "fraction-division";

  constructor() { }

  ngOnInit() {
  }

}
