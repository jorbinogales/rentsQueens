import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HomeDepartamentService } from './departament.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-departament-home',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.scss'],
})
export class HomeDepartamentComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  loading: boolean = true;
  apartament: any;
  url: string;
  apartaments: any;
  session: boolean = false;

  constructor(
    private readonly _cookieService: CookieService,
    private readonly _homeDepartamentService: HomeDepartamentService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.onSession();
    this.url = environment.MS_USER_API;
    /* GET QUESTION */
    this._homeDepartamentService.apartament$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((apartament: any) => {
        this.apartament = apartament;
        this.loading = false;
      });

    this._homeDepartamentService.getAparments().then((resp) => {
      this.loading = false;
      this.apartaments = resp;
    });
  }

  private onSession() {
    const token = this._cookieService.get('token');
    token ? (this.session = true) : (this.session = false);
  }

  backClicked() {
    this._location.back();
  }
}
