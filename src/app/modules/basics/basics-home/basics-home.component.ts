import { Component, OnInit} from '@angular/core';
import { RouterCard } from 'src/app/core/domain/models/router-card';

const basicsPath = "/basics";

@Component({
  selector: 'app-basics',
  templateUrl: './basics-home.component.html',
  styleUrls: ['./basics-home.component.scss']
})
export class BasicsHomeComponent implements OnInit {

  routerCards = [
    new RouterCard("basic-addition", basicsPath + "/addition", "Addition"),
    new RouterCard("basic-subtraction", basicsPath + "/subtraction", "Subtraction"),
    new RouterCard("basic-multiplication", basicsPath + "/multiplication", "Multiplication"),
    new RouterCard("basic-division", basicsPath + "/division", "Division")
  ];

  constructor() { }

  ngOnInit() {
  }
}
