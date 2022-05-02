import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeInitService } from './home-init.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-init.component.html',
  styleUrls: ['./home-init.component.scss']
})
export class HomeInitComponent implements OnInit {

  loading: boolean = true;
  apartaments: any;

  constructor(
    private readonly _homeInitService: HomeInitService,
  ) { } 

  ngOnInit(): void {
    this._homeInitService.getAparments().then((resp)=> {
      this.loading = false;
      this.apartaments = resp;
    })
  }
}
