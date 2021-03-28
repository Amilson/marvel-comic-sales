import { NgModule } from '@angular/core';
import { MarvelFormatCurrencyPipe } from './marvel-format-currency';
import { MarvelFormatDateTimelapsePipe } from './marvel-format-date-timelapse';

@NgModule({
  declarations: [MarvelFormatCurrencyPipe, MarvelFormatDateTimelapsePipe],
  exports: [MarvelFormatCurrencyPipe, MarvelFormatDateTimelapsePipe],
})
export class MarvelPipesModule {}
