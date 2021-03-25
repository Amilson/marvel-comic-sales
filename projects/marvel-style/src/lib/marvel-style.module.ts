import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarvelStyleService } from './core/services/marvel-style.service';
import {
  MarvelStyleSettingsService,
  MarvelStyleThemeSettingsService,
} from './core/services/settings';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  providers: [MarvelStyleService, MarvelStyleSettingsService, MarvelStyleThemeSettingsService],
})
export class MarvelStyleModule {}
