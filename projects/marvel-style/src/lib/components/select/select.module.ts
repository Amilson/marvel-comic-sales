import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarvelSelectComponent } from './select.component';
import { MarvelSelectSearchComponent } from './select-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarvelOptionModule } from '../option';
import { MarvelIconModule } from '../icon';
import { MarvelInputModule } from '../input';
import { MarvelProgressModule } from '../progress';

@NgModule({
  declarations: [MarvelSelectComponent, MarvelSelectSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarvelInputModule,
    MarvelOptionModule,
    MarvelIconModule,
    MarvelProgressModule,
  ],
  exports: [MarvelSelectComponent, MarvelSelectSearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelSelectModule {}
