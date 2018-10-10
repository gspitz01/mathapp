import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { FRACTION_MULTIPLICATION_LEVEL_ORDER } from '../round-levels';

@Component({
  selector: 'app-fraction-multiplication',
  templateUrl: './fraction-multiplication.component.html',
  styleUrls: ['./fraction-multiplication.component.scss']
})
export class FractionMultiplicationComponent implements OnInit {

  startingLevel = 1;
  startingTime = new Seconds(60);
  levelOrder = FRACTION_MULTIPLICATION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
