import { Component, OnInit} from '@angular/core';
import { RouterCard } from '../router-card';

@Component({
  selector: 'app-fractions',
  templateUrl: './fractions.component.html',
  styleUrls: ['./fractions.component.scss']
})
export class FractionsComponent implements OnInit {

  routerCards = [
    new RouterCard("greatest-factor", "/gcf", "Greatest Common Factor"),
    new RouterCard("simplify-fraction", "/simplify-fraction", "Simplify Fraction"),
    new RouterCard("fraction-addition", "/fraction-addition", "Addition"),
    new RouterCard("fraction-subtraction", "/fraction-subtraction", "Subtraction"),
    new RouterCard("fraction-multiplication", "/fraction-multiplication", "Multiplication"),
    new RouterCard("fraction-division", "/fraction-division", "Division")
  ];

  constructor() { }

  ngOnInit() {
  }
}
