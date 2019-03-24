import { Component, OnInit } from '@angular/core';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { BASIC_DIVISION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-division-round-levels';
import { ActivatedRoute } from '@angular/router';
import { NUMBER_NAMES, QUIZ_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-basic-division',
  templateUrl: './basic-division.component.html',
  styleUrls: ['./basic-division.component.scss']
})
export class BasicDivisionComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder = BASIC_DIVISION_LEVEL_ORDER;
  quizName = QUIZ_NAMES[1];  // 'basic-division'

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let roundIndex = NUMBER_NAMES.map(numberName => numberName.toLocaleLowerCase()).indexOf(params['roundName']);
      let roundName = params['roundName'];
      if (roundIndex === -1) {
        roundIndex = 0;
        roundName = "two";
      }
      this.levelOrder = BASIC_DIVISION_LEVEL_ORDER[roundIndex];
      this.quizName += "-" + roundName;
    });
  }

}
