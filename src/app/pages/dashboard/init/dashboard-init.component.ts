import { Component, OnInit } from '@angular/core';
import { DashboardInitService } from './dashboard-init.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-init.component.html',
  styleUrls: ['./dashboard-init.component.scss'],
})
export class DashboardInitComponent implements OnInit {
  loading: boolean = true;
  apartaments: any;
  currentPageRouter: any;

  paginationControl = {
    maxSize: 9,
    directionLinks: false,
    autoHide: false,
    responsive: false,
  };

  constructor(
    private readonly _dashboardInitService: DashboardInitService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._dashboardInitService.getAparments().then((resp) => {
      this.loading = false;
      this.apartaments = resp;
    });
    this._activatedRoute.params.subscribe((params) => {
      this.currentPageRouter = params['page'] ? params['page'] : '1';
      this.getDataFromFilter(parseInt(this.currentPageRouter));
    });
  }

  async getDataFromFilter(page?: number) {
    this.loading = true;
    await this._dashboardInitService.getAparments(page).then(
      (resp: any) => {
        this.loading = false;
        this.apartaments = resp;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  async pageChanged(event): Promise<any> {
    this._router.navigate(['/', 'dashboard', 'page', event]);
  }

  async changeStatus(id: number): Promise<any> {
    await this._dashboardInitService.changeStatus(id);
    await this.getDataFromFilter();
  }

  async deleteDepartament(id: number): Promise<any> {
    await this._dashboardInitService.deleteDepertament(id);
    await this.getDataFromFilter();
  }
}
