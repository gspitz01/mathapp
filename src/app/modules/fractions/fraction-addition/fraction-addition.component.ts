import { Component, OnInit } from '@angular/core';
import { FRACTION_ADDITION_LEVEL_ORDER } from '../../../core/domain/models/fractions/fraction-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-fraction-addition',
  templateUrl: './fraction-addition.component.html',
  styleUrls: ['./fraction-addition.component.scss']
})
export class FractionAdditionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_ADDITION_LEVEL_ORDER;
  quizName = QUIZ_NAMES[4];  // 'fraction-addition'

  constructor() { }

  ngOnInit() {
  }

}
