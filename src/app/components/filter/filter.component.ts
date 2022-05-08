import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterData: EventEmitter<any> = new EventEmitter();

  form: any = FormGroup;
  trains: any;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this._filterService.getTrains().then((resp)=> {
      this.trains = resp;
    })
  }

  buildForm(){
    this.form = this._formBuilder.group({
      floors: [],
      credit: [],
      beds: [],
      baths: [],
      price: [],
      trains: [],
      parking: [],
      id: [],
    });
  }

  sendFilter(){
    const form = this.form.getRawValue();
    this.filterData.emit(form);
    document.getElementById('closeModalFilter').click();
  }

  refreshFilter(){
    this.form.reset();
    this.sendFilter();
  }

}
