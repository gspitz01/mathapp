import { Component, OnInit, Input } from '@angular/core';
import { RouterCard } from '../router-card';

@Component({
  selector: 'app-router-cards-view',
  templateUrl: './router-cards-view.component.html',
  styleUrls: ['./router-cards-view.component.scss']
})
export class RouterCardsViewComponent implements OnInit {

  @Input() cards: RouterCard[];

  constructor() { }

  ngOnInit() {
  }

}
