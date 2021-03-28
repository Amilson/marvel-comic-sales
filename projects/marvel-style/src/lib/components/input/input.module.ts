import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MarvelInputComponent } from './input.component';
import { MarvelTextareaComponent } from './textarea.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MarvelIconModule } from '../icon';

@NgModule({
  declarations: [MarvelInputComponent, MarvelTextareaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MarvelIconModule,
  ],
  exports: [MarvelInputComponent, MarvelTextareaComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelInputModule {}
