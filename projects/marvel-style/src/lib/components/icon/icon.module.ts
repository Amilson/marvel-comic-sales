import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelIconComponent } from './icon.component';
import {
  MarvelIconAlignJustifyComponent,
  MarvelIconArrowLeftClosedComponent,
  MarvelIconArrowDownClosedComponent,
  MarvelIconEyeClosedComponent,
  MarvelIconEyeComponent,
  MarvelIconFacebookComponent,
  MarvelIconFacebookRoundComponent,
  MarvelIconGoogleComponent,
  MarvelIconMailComponent,
  MarvelIconSearchComponent,
  MarvelIconTrashComponent,
  MarvelIconInstagramRoundComponent,
  MarvelIconTwitterRoundComponent,
  MarvelIconHeartComponent,
  MarvelIconUserComponent,
  MarvelIconXCircleComponent,
} from './icons.component';

@NgModule({
  declarations: [
    MarvelIconAlignJustifyComponent,
    MarvelIconArrowLeftClosedComponent,
    MarvelIconArrowDownClosedComponent,
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
    MarvelIconTrashComponent,
    MarvelIconTwitterRoundComponent,
    MarvelIconUserComponent,
    MarvelIconXCircleComponent,
  ],
  imports: [CommonModule],
  exports: [MarvelIconComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MarvelIconModule {}
