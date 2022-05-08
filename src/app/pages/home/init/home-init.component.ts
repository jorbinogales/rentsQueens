import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  p: number = 1;

  paginationControl = {
    maxSize: 9,
    directionLinks: false,
    autoHide: false,
    responsive: false
  }

  constructor(
    private readonly _homeInitService: HomeInitService,
    private readonly _cookieService: CookieService,
    private readonly _router: Router,
  ) { } 

  ngOnInit(): void {
    const token = this._cookieService.get('token');
    token ? this._router.navigate(['', 'dashboard']) : this._router.navigate(['', 'home']);

    this._homeInitService.getAparments().then((resp)=> {
      this.loading = false;
      this.apartaments = resp;
    })
  }

  async getDataFromFilter(e, page?: number){
    this.loading = true;
    const form = e;
    await  this._homeInitService.getAparments(form, page).then((resp:any) =>{
      this.loading = false;
      this.apartaments = resp;
    }, (err) => {
      this.loading = false;
    })
  }

  async pageChanged(event): Promise<any>{
    console.log(event);
    await this.getDataFromFilter(null, event);
  }
}
