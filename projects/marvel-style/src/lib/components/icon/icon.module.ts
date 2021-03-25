import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelIconComponent } from './icon.component';
import {
  MarvelIconEyeClosedComponent,
  MarvelIconEyeComponent,
  MarvelIconFacebookComponent,
  MarvelIconGoogleComponent,
  MarvelIconMailComponent,
  MarvelIconUserComponent,
} from './icons.component';

@NgModule({
  declarations: [
    MarvelIconComponent,
    MarvelIconEyeClosedComponent,
    MarvelIconEyeComponent,
    MarvelIconFacebookComponent,
    MarvelIconGoogleComponent,
    MarvelIconEyeComponent,
    MarvelIconMailComponent,
    MarvelIconUserComponent,
  ],
  imports: [CommonModule],
  exports: [MarvelIconComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelIconModule {}
