import { Component, OnInit} from '@angular/core';
import { RouterCard } from '../router-card';


@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {

  routerCards = [
    new RouterCard("basic-addition", "/basic-addition", "Addition"),
    new RouterCard("basic-subtraction", "/basic-subtraction", "Subtraction"),
    new RouterCard("basic-multiplication", "/basic-multiplication", "Multiplication"),
    new RouterCard("basic-division", "/basic-division", "Division")
  ];

  constructor() { }

  ngOnInit() {
  }
}
