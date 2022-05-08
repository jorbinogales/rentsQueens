import { Injectable } from '@angular/core';
import {
Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CreateApartamentService } from './create-apartament.service';

@Injectable({
  providedIn: 'root'
})
export class CreateApartamentResolver implements Resolve<any> {
    constructor(private readonly createApartamentService: CreateApartamentService){}
    /** 
    * Resolver
    * 
    * @param route
    * @param state
    */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.createApartamentService.getTrains();
  }
}