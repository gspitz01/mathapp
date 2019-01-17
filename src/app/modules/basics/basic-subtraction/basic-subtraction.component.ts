import { Component, OnInit } from '@angular/core';
import { Seconds } from '../../../shared/models/seconds';
import { BASIC_SUBTRACTION_LEVEL_ORDER } from '../../../shared/models/round-levels';

@Component({
  selector: 'app-basic-subtraction',
  templateUrl: './basic-subtraction.component.html',
  styleUrls: ['./basic-subtraction.component.scss']
})
export class BasicSubtractionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = BASIC_SUBTRACTION_LEVEL_ORDER;
  quizName = "basic-subtraction";

  constructor() { }

  ngOnInit() {
  }

}
