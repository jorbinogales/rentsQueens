import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    HomeModule,
    CommonModule
  ],
  exports:[
    HomeModule,
  ],
})
export class PagesModule { }
