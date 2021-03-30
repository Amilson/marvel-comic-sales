import { Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MarvelUtils } from 'marvel-style';

@Pipe({
  name: 'marvelFormatDateTimelapse',
})
export class MarvelFormatDateTimelapsePipe implements PipeTransform {
  private formatDate: string = 'YYYY/MM/DD';

  constructor(private injector: Injector) {
    const translateService = this.injector.get(TranslateService);
    translateService.get('FORMAT-DATE').subscribe((_) => {
      this.formatDate = _;
    });
  }

  transform(date: string | Date, showTime?: false, format?: any): string {
    const { formatDate } = this;
    if (!MarvelUtils.persistNullEmptyUndefined(date)) return '';
    if (!format) {
      format = '- HH:mm';
    }
    let stillUtc: any = moment.utc(date).toDate();
    if (date.toString()?.indexOf(':') <= -1) {
      stillUtc = date;
      showTime = false;
    }
    const formatFrom = `YYYY/MM/DD${showTime ? ` ${format}` : ''}`;
    const formatTo = `${formatDate}${showTime ? ` ${format}` : ''}`;
    return `${moment(stillUtc, formatFrom).format(formatTo)}`;
  }
}
