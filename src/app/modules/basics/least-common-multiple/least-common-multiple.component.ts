import { Component, OnInit } from '@angular/core';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { LCM_LEVEL_ORDER } from 'src/app/core/domain/models/basics/lcm-round-levels';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-least-common-multiple',
  templateUrl: './least-common-multiple.component.html',
  styleUrls: ['./least-common-multiple.component.scss']
})
export class LeastCommonMultipleComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = LCM_LEVEL_ORDER;
  quizName = QUIZ_NAMES[11];  // 'lcm'

  constructor() { }

  ngOnInit() {
  }

}
