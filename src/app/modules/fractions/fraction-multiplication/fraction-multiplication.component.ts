import { Component, OnInit } from '@angular/core';
import { FRACTION_MULTIPLICATION_LEVEL_ORDER } from '../../../core/domain/models/fractions/fraction-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-fraction-multiplication',
  templateUrl: './fraction-multiplication.component.html',
  styleUrls: ['./fraction-multiplication.component.scss']
})
export class FractionMultiplicationComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_MULTIPLICATION_LEVEL_ORDER;
  quizName = QUIZ_NAMES[6];  // 'fraction-multiplication'

  constructor() { }

  ngOnInit() {
  }

}
