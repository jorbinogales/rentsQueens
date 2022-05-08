import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { TrainInterface } from '../../interface/train.interface';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public _train: BehaviorSubject<TrainInterface | null> = new BehaviorSubject(null);

    constructor(private _http : HttpClient){}

    get train$(): Observable<TrainInterface>
    {
        return this._train.asObservable();
    }

    getTrains(): Promise<any>
    {
        return this._http.get<any>(`${environment.MS_USER_API}/trains/index`).toPromise();
    }
}