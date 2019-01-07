import { Component, OnInit } from '@angular/core';
import { Seconds } from '../../../shared/models/seconds';
import { FRACTION_SUBTRACTION_LEVEL_ORDER } from '../models/fraction-round-levels';

@Component({
  selector: 'app-fraction-subtraction',
  templateUrl: './fraction-subtraction.component.html',
  styleUrls: ['./fraction-subtraction.component.scss']
})
export class FractionSubtractionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_SUBTRACTION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
