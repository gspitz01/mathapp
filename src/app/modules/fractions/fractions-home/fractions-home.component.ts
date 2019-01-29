import { Component, OnInit} from '@angular/core';
import { RouterCard } from 'src/app/core/domain/models/router-card';

const fractionPath = "/fractions";

@Component({
  selector: 'app-fractions',
  templateUrl: './fractions-home.component.html',
  styleUrls: ['./fractions-home.component.scss']
})
export class FractionsHomeComponent implements OnInit {

  routerCards = [
    new RouterCard("greatest-factor", fractionPath + "/gcf", "Greatest Common Factor"),
    new RouterCard("simplify-fraction", fractionPath + "/simplify", "Simplify Fraction"),
    new RouterCard("fraction-addition", fractionPath + "/addition", "Addition"),
    new RouterCard("fraction-subtraction", fractionPath + "/subtraction", "Subtraction"),
    new RouterCard("fraction-multiplication", fractionPath + "/multiplication", "Multiplication"),
    new RouterCard("fraction-division", fractionPath + "/division", "Division")
  ];

  constructor() { }

  ngOnInit() {
  }
}
