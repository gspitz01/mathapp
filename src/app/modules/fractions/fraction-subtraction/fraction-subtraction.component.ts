import { Component, OnInit } from '@angular/core';
import { FRACTION_SUBTRACTION_LEVEL_ORDER } from '../../../core/domain/models/fractions/fraction-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-fraction-subtraction',
  templateUrl: './fraction-subtraction.component.html',
  styleUrls: ['./fraction-subtraction.component.scss']
})
export class FractionSubtractionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_SUBTRACTION_LEVEL_ORDER;
  quizName = QUIZ_NAMES[7];  // 'fraction-subtraction'

  constructor() { }

  ngOnInit() {
  }

}
