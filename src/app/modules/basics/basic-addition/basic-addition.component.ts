import { Component, OnInit } from '@angular/core';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { BASIC_ADDITION_LEVEL_ORDER } from 'src/app/core/domain/models/round-levels';

@Component({
  selector: 'app-basic-addition',
  templateUrl: './basic-addition.component.html',
  styleUrls: ['./basic-addition.component.scss']
})
export class BasicAdditionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = BASIC_ADDITION_LEVEL_ORDER;
  quizName = "basic-addition";

  constructor() { }

  ngOnInit() {
  }

}
