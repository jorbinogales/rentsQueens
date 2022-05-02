import { Component, Input, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() departament:any;
  url: string;

  constructor() { }

  ngOnInit(): void {
    this.url = environment.MS_USER_API;
    console.log(this.departament);
  }

}
