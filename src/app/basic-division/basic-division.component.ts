import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { BASIC_DIVISION_LEVEL_ORDER } from '../round-levels';

@Component({
  selector: 'app-basic-division',
  templateUrl: './basic-division.component.html',
  styleUrls: ['./basic-division.component.scss']
})
export class BasicDivisionComponent implements OnInit {

  startingLevel = 1;
  startingTime = new Seconds(60);
  levelOrder = BASIC_DIVISION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}
