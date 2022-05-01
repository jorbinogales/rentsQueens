import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserInterface } from '../../interface/user.interface';
import { environment } from "src/environments/environment";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    public _user: BehaviorSubject<UserInterface | null > = new BehaviorSubject(null);

    constructor(private _http: HttpClient){}

    get user$(): Observable<UserInterface>
    {
        return this._user.asObservable();
    }

    login(form: any): Observable<UserInterface>
    {
       let formData = {
           email : form.email,
           password: form.password
       }
       return this._http.post<UserInterface>(`${environment.MS_USER_API}/user/login`, formData).pipe(
           tap((response) => {
                return response;
           })
       )
    }


}