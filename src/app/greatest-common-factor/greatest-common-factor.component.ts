import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { GREATEST_COMMON_FACTOR_LEVEL_ORDER } from '../round-levels';

@Component({
  selector: 'app-greatest-common-factor',
  templateUrl: './greatest-common-factor.component.html',
  styleUrls: ['./greatest-common-factor.component.scss']
})
export class GreatestCommonFactorComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = GREATEST_COMMON_FACTOR_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
