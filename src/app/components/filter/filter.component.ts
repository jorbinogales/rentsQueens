import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filterData: EventEmitter<any> = new EventEmitter();

  params: any;
  form: any = FormGroup;
  trains: any;
  cities: any;
  subcities: any;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _filterService: FilterService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._filterService.getTrains().then((resp) => {
      this.trains = resp;
    });
    this._filterService.getCity().then((resp) => {
      this.cities = resp;
    });
    this._route.queryParams.subscribe((params) => {
      this.params = params;
    });
    this.buildForm();
  }

  buildForm() {
    this.form = this._formBuilder.group({
      floors: [],
      credit: [],
      pets: [],
      beds: [],
      baths: [],
      price: [],
      trains: [],
      subcity: [],
      parking: [],
      id: [],
      search: [],
    });
    this.form.controls['credit'].setValue(
      this.params.credit != null ? this.params.credit : null
    );
    this.form.controls['pets'].setValue(
      this.params.pets != null ? this.params.pets : null
    );
    this.form.controls['parking'].setValue(
      this.params.parking != null ? this.params.parking : null
    );
    this.form.controls['search'].setValue(
      this.params.search != null ? this.params.search : null
    );
    this.form.controls['id'].setValue(
      this.params.id != null ? this.params.id : null
    );
    this.form.controls['beds'].setValue(
      this.params.beds != null ? this.params.beds : null
    );
    this.form.controls['floors'].setValue(
      this.params.floors != null ? this.params.floors : null
    );
    this.form.controls['baths'].setValue(
      this.params.baths != null ? this.params.baths : null
    );
    this.form.controls['price'].setValue(
      this.params.price != null ? this.params.price : null
    );
    this.form.controls['trains'].setValue(
      this.params.trains != null ? this.params.trains : null
    );
    this.form.controls['subcity'].setValue(
      this.params.subcity != null ? this.params.subcity : null
    );
    this.sendFilter();
  }

  sendFilter() {
    const form = this.form.getRawValue();
    this.filterData.emit(form);
    document.getElementById('closeModalFilter').click();
  }

  refreshFilter() {
    this.form.reset();
    this._router.navigate(['/', 'home', 'page', 1]);
  }

  getSubCity(e) {
    const city_id = e.target.value;
    this._filterService.getSubCity(city_id).then((resp) => {
      this.subcities = resp;
    });
  }
}
