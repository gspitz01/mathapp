import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { BASIC_SUBTRACTION_LEVEL_ORDER } from '../round-levels';

@Component({
  selector: 'app-basic-subtraction',
  templateUrl: './basic-subtraction.component.html',
  styleUrls: ['./basic-subtraction.component.scss']
})
export class BasicSubtractionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = BASIC_SUBTRACTION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
