import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FilterComponent],
})
export class FilterModule {}
