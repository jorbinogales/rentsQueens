import { Component, OnInit } from '@angular/core';
import data from './../../core/departament.json';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  departaments: any[] = [];
  departament_active: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.departaments = data;
  }

  activeDepartament(){
    this.departament_active = !this.departament_active;
  }

}
