import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarvelButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarvelIconModule } from '../icon';

@NgModule({
  declarations: [MarvelButtonComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MarvelIconModule],
  exports: [MarvelButtonComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelButtonModule {}
