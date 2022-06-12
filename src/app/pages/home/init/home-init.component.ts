import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { HomeInitService } from './home-init.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home-init.component.html',
  styleUrls: ['./home-init.component.scss'],
})
export class HomeInitComponent implements OnInit {
  loading: boolean = true;
  apartaments: any;
  p: number = 1;
  error: boolean = false;
  currentPageRouter: any;

  paginationControl = {
    maxSize: 9,
    directionLinks: false,
    autoHide: false,
    responsive: false,
  };

  constructor(
    private readonly _homeInitService: HomeInitService,
    private readonly _cookieService: CookieService,
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._homeInitService.getAparments().then(
      (resp) => {
        this.error = false;
        this.loading = false;
        this.apartaments = resp;
      },
      (err) => {
        console.log('err', err);
        this.error = true;
      }
    );

    this._activatedRoute.params.subscribe((params) => {
      this.currentPageRouter = params['page'] ? params['page'] : '1';
      this.getDataFromFilter(null, parseInt(this.currentPageRouter));
    });
  }

  async getDataFromFilter(e, page?: number) {
    this.loading = true;
    const form = e;
    await this._homeInitService.getAparments(form, page).then(
      (resp: any) => {
        this.error = false;
        this.loading = false;
        this.apartaments = resp;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  async pageChanged(event): Promise<any> {
    this._router.navigate(['/', 'home', 'page', event]);
  }
}
