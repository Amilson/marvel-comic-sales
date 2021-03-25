import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarvelModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarvelButtonModule } from '../button';

@NgModule({
  declarations: [MarvelModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MarvelButtonModule],
  exports: [MarvelModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelModalModule {}
