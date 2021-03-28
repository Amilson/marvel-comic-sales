import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarvelProgressComponent } from './progress.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MarvelProgressComponent],
  imports: [CommonModule],
  exports: [MarvelProgressComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelProgressModule {}
