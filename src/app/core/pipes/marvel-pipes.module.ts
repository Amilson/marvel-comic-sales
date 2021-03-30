import { NgModule } from '@angular/core';
import { MarvelFormatCurrencyPipe } from './marvel-format-currency';
import { MarvelFormatDateTimelapsePipe } from './marvel-format-date-timelapse';
import { MarvelTextTruncatePipe } from './marvel-text-truncate';

@NgModule({
  declarations: [MarvelFormatCurrencyPipe, MarvelFormatDateTimelapsePipe, MarvelTextTruncatePipe],
  exports: [MarvelFormatCurrencyPipe, MarvelFormatDateTimelapsePipe, MarvelTextTruncatePipe],
})
export class MarvelPipesModule {}
