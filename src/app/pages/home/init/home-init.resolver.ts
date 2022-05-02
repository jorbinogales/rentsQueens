import { Injectable } from '@angular/core';
import {
Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { HomeInitService } from './home-init.service';

@Injectable({
  providedIn: 'root'
})
export class HomeInitResolver implements Resolve<any> {
    constructor(private readonly homeInitService: HomeInitService){}

    /** 
    * Resolver
    * 
    * @param route
    * @param state
    */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.homeInitService.getAparments();
  }
}
