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

  
  paginationControl = {
    maxSize: 9,
    directionLinks: false,
    autoHide: false,
    responsive: false
  }

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

  async getDataFromFilter(page?: number){
    this.loading = true;
    await  this._dashboardInitService.getAparments(page).then((resp:any) =>{
      this.loading = false;
      this.apartaments = resp;
    }, (err) => {
      this.loading = false;
    })
  }

  async pageChanged(event): Promise<any>{
    await this.getDataFromFilter(event);
  }

}
