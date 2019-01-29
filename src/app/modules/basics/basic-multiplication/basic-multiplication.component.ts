import { Component, OnInit } from '@angular/core';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from 'src/app/core/domain/models/basic-multiplication-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';

@Component({
  selector: 'app-basic-multiplication',
  templateUrl: './basic-multiplication.component.html',
  styleUrls: ['./basic-multiplication.component.scss']
})
export class BasicMultiplicationComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = BASIC_MULTIPLICATION_LEVEL_ORDER;
  quizName = "basic-multiplication";

  constructor() { }

  ngOnInit() {
  }

}
