import { Injectable } from '@angular/core';
import {
Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DashboardInitService } from './dashboard-init.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardInitResolver implements Resolve<any> {
    constructor(private readonly dashboardInitService: DashboardInitService){}

    /** 
    * Resolver
    * 
    * @param route
    * @param state
    */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.dashboardInitService.getAparments();
  }
}