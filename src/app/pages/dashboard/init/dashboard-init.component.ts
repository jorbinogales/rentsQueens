import { Component, OnInit } from '@angular/core';
import { DashboardInitService } from './dashboard-init.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-init.component.html',
  styleUrls: ['./dashboard-init.component.scss']
})
export class DashboardInitComponent implements OnInit {

  loading: boolean = true;
  apartaments: any;

  constructor(
    private readonly _dashboardInitService: DashboardInitService,
  ) { } 

  ngOnInit(): void {
    this._dashboardInitService.getAparments().then((resp)=> {
      console.log(resp);
      this.loading = false;
      this.apartaments = resp;
    })
  }

}
