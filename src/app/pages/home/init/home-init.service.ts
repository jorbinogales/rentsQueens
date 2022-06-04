import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApartamentInterface } from 'src/app/interface/apartament.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeInitService {
  public _apartament: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) {}

  get apartament$(): Observable<any> {
    return this._apartament.asObservable();
  }

  getAparments(data?: any, page?: any): Promise<any> {
    let form = {};
    if (data) {
      if (data.credit != null && data.credit != 'null') {
        data.credit = data.credit == 'true' ? true : false;
      }

      if (data.parking != null && data.parking != 'null') {
        data.parking = data.parking == 'true' ? true : false;
      }

      if (data.pets != null && data.pets != 'null') {
        data.pets = data.pets == 'true' ? true : false;
      }

      form = {
        floors: data.floors == 'null' ? null : data.floors,
        credit: data.credit == 'null' ? null : data.credit,
        bedrooms: data.beds == 'null' ? null : data.beds,
        bathrooms: data.baths == 'null' ? null : data.baths,
        price: data.price == 'null' ? null : data.price,
        parking: data.parking == 'null' ? null : data.parking,
        id: data.id == 'null' ? null : parseInt(data.id),
        train: data.id == 'null' ? null : parseInt(data.trains),
        subcity: data.id == 'null' ? null : parseInt(data.subcity),
        search: data.seach == 'null' ? null : data.search,
        pets: data.pets == 'null' ? null : data.pets,
      };
    }

    page = page == null ? 1 : page;
    return this._http
      .post<any>(
        `${environment.MS_USER_API}/departament/paginate?page=` + page,
        form
      )
      .toPromise();
  }
}
