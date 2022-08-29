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
    console.log(data);
    let form = {};
    let subcity = [];
    if (data) {
      if (data.credit != null && data.credit != 'null') {
        if (data.credit == true || data.credit == 'true') {
          data.credit = true;
        } else {
          data.credit = false;
        }
      }

      if (data.parking != null && data.parking != 'null') {
        if (data.parking == true || data.parking == 'true') {
          data.parking = true;
        } else {
          data.parking = false;
        }
      }

      if (data.pets != null && data.pets != 'null') {
        if (data.pets == true || data.pets == 'true') {
          data.pets = true;
        } else {
          data.pets = false;
        }
      }

      if (data.subcity_brooklyn) {
        subcity.push(data.subcity_brooklyn);
      }

      if (data.subcity_queens) {
        subcity.push(data.subcity_queens);
      }

      form = {
        floors: data.floors == 'null' ? null : data.floors,
        credit: data.credit == 'null' ? null : data.credit,
        bedrooms: data.beds == 'null' ? null : data.beds,
        bathrooms: data.baths == 'null' ? null : data.baths,
        price: data.price == 'null' ? null : data.price,
        parking: data.parking == 'null' ? null : data.parking,
        id: data.id == 'null' ? null : parseInt(data.id),
        train: data.trains == 'null' ? null : parseInt(data.trains),
        // city: data.city == 'null' ? null : parseInt(data.city),
        subcity: subcity == [] ? null : subcity,
        search: data.seach == 'null' ? null : data.search,
        pets: data.pets == 'null' ? null : data.pets,
      };
      console.log(form);
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
