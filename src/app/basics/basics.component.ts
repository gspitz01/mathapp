import { Component, OnInit} from '@angular/core';
import { RouterCard } from '../router-card';


@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {

  routerCards = [
    new RouterCard("/basic-addition", "Addition"),
    new RouterCard("/basic-subtraction", "Subtraction"),
    new RouterCard("/basic-multiplication", "Multiplication"),
    new RouterCard("/basic-division", "Division")
  ]

  constructor() { }

  ngOnInit() {
  }
}
