import { Component, OnInit } from '@angular/core';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-multiplication-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { ActivatedRoute } from '@angular/router';
import { PLURAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';

@Component({
  selector: 'app-basic-multiplication',
  templateUrl: './basic-multiplication.component.html',
  styleUrls: ['./basic-multiplication.component.scss']
})
export class BasicMultiplicationComponent implements OnInit {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder;
  quizName = "basic-multiplication";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let roundIndex = PLURAL_NUMBER_NAMES.map(numberName => numberName.toLocaleLowerCase()).indexOf(params['roundName']);
      let roundName = params['roundName'];
      if (roundIndex === -1) {
        roundIndex = 0;
        roundName = "twos";
      }
      this.levelOrder = BASIC_MULTIPLICATION_LEVEL_ORDER[roundIndex];
      this.quizName += "-" + roundName;
    });
  }

}
