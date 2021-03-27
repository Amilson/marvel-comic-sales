import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelIconComponent } from './icon.component';
import {
  MarvelIconArrowLeftClosedComponent,
  MarvelIconEyeClosedComponent,
  MarvelIconEyeComponent,
  MarvelIconFacebookComponent,
  MarvelIconFacebookRoundComponent,
  MarvelIconGoogleComponent,
  MarvelIconMailComponent,
  MarvelIconSearchComponent,
  MarvelIconInstagramRoundComponent,
  MarvelIconTwitterRoundComponent,
  MarvelIconHeartComponent,
  MarvelIconUserComponent,
} from './icons.component';

@NgModule({
  declarations: [
    MarvelIconArrowLeftClosedComponent,
    MarvelIconComponent,
    MarvelIconEyeClosedComponent,
    MarvelIconEyeComponent,
    MarvelIconFacebookComponent,
    MarvelIconFacebookRoundComponent,
    MarvelIconGoogleComponent,
    MarvelIconHeartComponent,
    MarvelIconInstagramRoundComponent,
    MarvelIconEyeComponent,
    MarvelIconMailComponent,
    MarvelIconSearchComponent,
    MarvelIconTwitterRoundComponent,
    MarvelIconUserComponent,
  ],
  imports: [CommonModule],
  exports: [MarvelIconComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelIconModule {}
