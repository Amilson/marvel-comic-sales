import { Pipe, PipeTransform, Injector } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'marvelFormatCurrency',
})
export class MarvelFormatCurrencyPipe extends CurrencyPipe implements PipeTransform {
  private currencyCode: string = 'BRL';
  private currentLocale: string = 'pt-BR';

  constructor(private injector: Injector) {
    super('pt-BR', 'BRL');
    const translateService = this.injector.get(TranslateService);
    translateService.get('CURRENCY-CODE').subscribe((_) => {
      this.currencyCode = _;
      this.currentLocale = translateService.getDefaultLang();
    });
  }

  transform(value: string): any {
    const { currencyCode, currentLocale } = this;
    if (!value) return 0;
    return super.transform(`${value}`, currencyCode, 'symbol', '', currentLocale);
  }
}
