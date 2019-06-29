import { Component, OnInit, OnDestroy } from '@angular/core';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-multiplication-round-levels';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { ActivatedRoute } from '@angular/router';
import { PLURAL_NUMBER_NAMES, QUIZ_NAMES } from 'src/app/core/domain/models/constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-basic-multiplication',
  templateUrl: './basic-multiplication.component.html',
  styleUrls: ['./basic-multiplication.component.scss']
})
export class BasicMultiplicationComponent implements OnInit, OnDestroy {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder;
  quizName = QUIZ_NAMES[2];  // 'basic-multiplication'

  // Subject to cue destruction of subscriptions
  private readonly onDestroy = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(params => {
      let roundIndex = PLURAL_NUMBER_NAMES.map(numberName => numberName.toLocaleLowerCase())
          .indexOf(params['roundName']);
      let roundName = params['roundName'];
      if (roundIndex === -1) {
        roundIndex = 0;
        roundName = 'twos';
      }
      this.levelOrder = BASIC_MULTIPLICATION_LEVEL_ORDER[roundIndex];
      this.quizName += '-' + roundName;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

}
