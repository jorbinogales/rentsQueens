import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CityInterface } from 'src/app/interface/city.interface';
import { environment } from "src/environments/environment";
import { TrainInterface } from '../../interface/train.interface';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    public _city: BehaviorSubject<CityInterface | null> = new BehaviorSubject(null);
    public _subcity: BehaviorSubject<any | null> = new BehaviorSubject(null);
    public _train: BehaviorSubject<TrainInterface | null> = new BehaviorSubject(null);

    constructor(private _http : HttpClient){}

    get train$(): Observable<TrainInterface>
    {
        return this._train.asObservable();
    }

    get city$(): Observable<CityInterface>
    {
        return this._city.asObservable();
    }

    get subcity$(): Observable<any>
    {
        return this._subcity.asObservable();
    }


    getTrains(): Promise<any>
    {
        return this._http.get<any>(`${environment.MS_USER_API}/trains/index`).toPromise();
    }

    getCity(): Promise<any>
    {
        return this._http.get<any>(`${environment.MS_USER_API}/city/index`).toPromise();
    }

    getSubCity(city_id: string): Promise<any>
    {
        return this._http.get<any>(`${environment.MS_USER_API}/subcity/${city_id}`).toPromise();
    }
}