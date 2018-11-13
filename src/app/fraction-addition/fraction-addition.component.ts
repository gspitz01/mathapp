import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { FRACTION_ADDITION_LEVEL_ORDER } from '../round-levels';

@Component({
  selector: 'app-fraction-addition',
  templateUrl: './fraction-addition.component.html',
  styleUrls: ['./fraction-addition.component.scss']
})
export class FractionAdditionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_ADDITION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
