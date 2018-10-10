import { Component, OnInit } from '@angular/core';
import { Seconds } from '../seconds';
import { BASIC_ADDITION_LEVEL_ORDER } from '../round-levels';

@Component({
  selector: 'app-basic-addition',
  templateUrl: './basic-addition.component.html',
  styleUrls: ['./basic-addition.component.scss']
})
export class BasicAdditionComponent implements OnInit {

  startingLevel = 1;
  startingTime = new Seconds(60);
  levelOrder = BASIC_ADDITION_LEVEL_ORDER;

  constructor() { }

  ngOnInit() {
  }

}