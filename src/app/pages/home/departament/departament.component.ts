import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HomeDepartamentService } from './departament.service';

@Component({
  selector: 'app-departament-home',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.scss']
})
export class HomeDepartamentComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  loading: boolean = true;
  apartament: any;
  url: string;
  apartaments: any;

  constructor(
    private readonly _homeDepartamentService: HomeDepartamentService
  ) { } 

  ngOnInit(): void {
    this.url = environment.MS_USER_API;
    /* GET QUESTION */
    this._homeDepartamentService.apartament$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((apartament: any) => {
        this.apartament = apartament;
        console.log(this.apartament);
        this.loading = false;
      })
      
    this._homeDepartamentService.getAparments().then((resp)=> {
      this.loading = false;
      this.apartaments = resp;
    })
  }
}
