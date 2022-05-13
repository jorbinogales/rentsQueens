import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DashboardInitService {
    public _apartament: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor(private _http : HttpClient){}

    get apartament$(): Observable<any>
    {
        return this._apartament.asObservable();
    }

    async getAparments(page?:number): Promise<any>
    {
        page = (page == null ? 1 : page);
        return await this._http.post<any>(`${environment.MS_USER_API}/departament/paginate/user?page=`+page, {}).toPromise();
    }

    async changeStatus(id:number){
        return await this._http.patch<any>(`${environment.MS_USER_API}/departament/${id}`, {}).toPromise();
    }

    async deleteDepertament(id:number){
        return await this._http.delete<any>(`${environment.MS_USER_API}/departament/${id}`, {}).toPromise();
    }
}