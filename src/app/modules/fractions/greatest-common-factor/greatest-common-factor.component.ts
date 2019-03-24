import { Component, OnInit } from '@angular/core';
import { GREATEST_COMMON_FACTOR_LEVEL_ORDER } from '../../../core/domain/models/fractions/gcf-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-greatest-common-factor',
  templateUrl: './greatest-common-factor.component.html',
  styleUrls: ['./greatest-common-factor.component.scss']
})
export class GreatestCommonFactorComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = GREATEST_COMMON_FACTOR_LEVEL_ORDER;
  quizName = QUIZ_NAMES[8];  // 'gcf'

  constructor() { }

  ngOnInit() {
  }

}
