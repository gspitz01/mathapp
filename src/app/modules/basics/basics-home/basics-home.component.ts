import { Component, OnInit} from '@angular/core';
import { RouterCard } from 'src/app/core/domain/models/router-card';

const basicsPath = '/fundamentals';

@Component({
  selector: 'app-basics',
  templateUrl: './basics-home.component.html',
  styleUrls: ['./basics-home.component.scss']
})
export class BasicsHomeComponent implements OnInit {

  routerCards = [
    new RouterCard('combination', basicsPath + '/combination', 'Combination'),
    new RouterCard('basic-addition', basicsPath + '/addition', 'Addition'),
    new RouterCard('basic-subtraction', basicsPath + '/subtraction', 'Subtraction'),
    new RouterCard('basic-multiplication', basicsPath + '/multiplication', 'Multiplication'),
    new RouterCard('basic-division', basicsPath + '/division', 'Division'),
    new RouterCard('exponentiation', basicsPath + '/exponentiation', 'Exponentiation'),
    new RouterCard('greatest-factor', basicsPath + '/gcf', 'Greatest Common Factor'),
    new RouterCard('lcm', basicsPath + '/lcm', 'Least Common Multiple')
  ];

  constructor() { }

  ngOnInit() {
  }
}
