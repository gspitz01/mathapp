import { Component, OnInit, OnDestroy } from '@angular/core';
import { Seconds } from 'src/app/core/domain/models/seconds';
import { QUIZ_NAMES, ORDINAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BASIC_EXPONENTIATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-exponentiation-round-levels';

@Component({
  selector: 'app-basic-exponentiation',
  templateUrl: './basic-exponentiation.component.html',
  styleUrls: ['./basic-exponentiation.component.scss']
})
export class BasicExponentiationComponent implements OnInit, OnDestroy {

  startingLevel = 0;
  startingTime = new Seconds(60);
  levelOrder;
  quizName = QUIZ_NAMES[10];  // 'exponentiation'

  // Subject to cue destruction of subscriptions
  private readonly onDestroy = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(params => {
      let roundIndex = ORDINAL_NUMBER_NAMES.map(numberName => numberName.toLocaleLowerCase())
          .indexOf(params['roundName']);
      let roundName = params['roundName'];
      if (roundIndex === -1) {
        roundIndex = 0;
        roundName = 'second';
      }
      this.levelOrder = BASIC_EXPONENTIATION_LEVEL_ORDER[roundIndex];
      this.quizName += '-' + roundName;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

}
