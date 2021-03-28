import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarvelOptionComponent } from './option.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MarvelOptionComponent],
  imports: [CommonModule],
  exports: [MarvelOptionComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelOptionModule {}
