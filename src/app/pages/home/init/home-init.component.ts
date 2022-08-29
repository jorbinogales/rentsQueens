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
  queryParams: any;
  globalForm: any;

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
    // this._homeInitService.getAparments().then(
    //   (resp) => {
    //     this.error = false;
    //     this.loading = false;
    //     this.apartaments = resp;
    //   },
    //   (err) => {
    //     console.log('err', err);
    //     this.error = true;
    //   }
    // );
    this._activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
    });
    this._activatedRoute.params.subscribe((params) => {
      this.currentPageRouter = params['page'] ? params['page'] : '1';
      this.getDataFromFilter(this.globalForm, parseInt(this.currentPageRouter));
    });
  }

  async getDataFromFilter(e, page?: number) {
    this.loading = true;
    this.globalForm = e;
    this.queryParams = {
      baths: this.globalForm.baths,
      beds: this.globalForm.beds,
      credit: this.globalForm.credit,
      floors: this.globalForm.floors,
      id: this.globalForm.id,
      parking: this.globalForm.parking,
      pets: this.globalForm.pets,
      price: this.globalForm.price,
      search: this.globalForm.search,
      subcity_queens: this.globalForm.subcity_queens,
      subcity_brooklyn: this.globalForm.subcity_brooklyn,
      trains: this.globalForm.trains,
    };
    if (page) {
      this.currentPageRouter = page;
    }
    await this._homeInitService
      .getAparments(this.globalForm, this.currentPageRouter)
      .then(
        (resp: any) => {
          if (resp.meta.page > 1 && resp.data.length == 0) {
            this._router.navigate(['/', 'home', 'page', 1], {
              queryParams: this.queryParams,
            });
          } else if (resp.data.length > 0) {
            this.error = false;
            this.loading = false;
            this.apartaments = resp;
            this._router.navigate(['/', 'home', 'page', resp.meta.page], {
              queryParams: this.queryParams,
            });
          } else {
            this.loading = false;
            this.apartaments = resp;
          }
        },
        (err) => {
          this.error = true;
          this.loading = false;
        }
      );
  }

  async pageChanged(event): Promise<any> {
    this._router.navigate(['/', 'home', 'page', event], {
      queryParams: this.queryParams,
    });
  }
}
