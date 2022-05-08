import { Injectable } from '@angular/core';
import {
Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { HomeDepartamentService } from './departament.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDepartamentResolver implements Resolve<any> {
    constructor(private readonly _homeDepartamentService: HomeDepartamentService){}

    /** 
    * Resolver
    * 
    * @param route
    * @param state
    */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const departamentId = route.params.id;
    return this._homeDepartamentService.getApartament(departamentId);
  }
}
