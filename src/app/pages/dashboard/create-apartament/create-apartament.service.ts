import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApartamentInterface } from 'src/app/interface/apartament.interface';
import { CityInterface } from 'src/app/interface/city.interface';
import { environment } from 'src/environments/environment';
import { TrainInterface } from '../../../interface/train.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateApartamentService {
  public _city: BehaviorSubject<CityInterface | null> = new BehaviorSubject(
    null
  );
  public _subcity: BehaviorSubject<any | null> = new BehaviorSubject(null);
  public _train: BehaviorSubject<TrainInterface | null> = new BehaviorSubject(
    null
  );
  public _apartament: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) {}

  get apartament$(): Observable<any> {
    return this._apartament.asObservable();
  }

  get train$(): Observable<TrainInterface> {
    return this._train.asObservable();
  }

  get city$(): Observable<CityInterface> {
    return this._city.asObservable();
  }

  get subcity$(): Observable<any> {
    return this._subcity.asObservable();
  }

  getTrains(): Promise<any> {
    return this._http
      .get<any>(`${environment.MS_USER_API}/trains/index`)
      .toPromise();
  }

  getCity(): Promise<any> {
    return this._http
      .get<any>(`${environment.MS_USER_API}/city/index`)
      .toPromise();
  }

  getApartament(number: any): Observable<any> {
    return this._http
      .get<any>(`${environment.MS_USER_API}/departament/` + number)
      .pipe(
        tap((response) => {
          this._apartament.next(response);
        })
      );
  }

  createApartament(form: any, id?: string): Observable<ApartamentInterface> {
    let data = {
      title: form.title,
      description: form.description,
      internal_description: form.internal_description,
      price: form.price,
      address: form.address,
      floors: form.floors,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      credit: form.credit,
      pets: form.pets,
      trains: form.trains,
      subcity: parseInt(form.subcity),
      parking: form.parking,
      phone: form.phone,
    };
    if (id) {
      return this._http
        .put<ApartamentInterface>(
          `${environment.MS_USER_API}/departament/${id}`,
          data
        )
        .pipe(
          tap((response) => {
            return response;
          })
        );
    }
    return this._http
      .post<ApartamentInterface>(`${environment.MS_USER_API}/departament`, data)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  uploadImageApartament(apartament_id: string, files: any[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('departament_id', apartament_id);
    files.forEach((file) => {
      formData.append('image', file);
    });
    return this._http
      .post<any>(`${environment.MS_USER_API}/departament_image`, formData)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  createTrainsDepartament(apartament_id: string, form: any): Observable<any> {
    let data = {
      departament_id: apartament_id,
      trains: form.trains,
    };
    return this._http
      .post<any>(`${environment.MS_USER_API}/departament_train`, data)
      .pipe(
        tap((response) => {
          return response;
        })
      );
  }

  getSubCities(city_id: string): Promise<any> {
    return this._http
      .get<any>(`${environment.MS_USER_API}/subcity/${city_id}`)
      .toPromise();
  }

  async getSubCity(subcity_id: string): Promise<any> {
    return await this._http
      .get<any>(`${environment.MS_USER_API}/subcity/show/${subcity_id}`)
      .toPromise();
  }
}
