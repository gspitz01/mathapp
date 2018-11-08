import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from '../basic-multiplication-round-levels';

@Component({
  selector: 'app-basic-multiplication',
  templateUrl: './basic-multiplication.component.html',
  styleUrls: ['./basic-multiplication.component.scss']
})
export class BasicMultiplicationComponent implements OnInit {

  startingLevel = 1;
  startingTime = new Seconds(60);
  levelOrder = BASIC_MULTIPLICATION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
