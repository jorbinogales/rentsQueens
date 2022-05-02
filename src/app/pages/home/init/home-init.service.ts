import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ApartamentInterface } from "src/app/interface/apartament.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HomeInitService {
    public _apartament: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor(private _http : HttpClient){}

    get apartament$(): Observable<any>
    {
        return this._apartament.asObservable();
    }

    getAparments(): Promise<any>
    {
     
        return this._http.post<any>(`${environment.MS_USER_API}/departament/paginate`, {}).toPromise();
    }
}