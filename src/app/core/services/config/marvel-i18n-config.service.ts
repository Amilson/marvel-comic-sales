/* eslint-disable no-console */
/* eslint-disable import/no-named-default */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { default as localePTBR } from '@angular/common/locales/global/pt';
import { default as localeENUS } from '@angular/common/locales/global/en';
import { MarvelConfig } from 'app/interfaces';
import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { MarvelCoreService } from '../../decorators/marvel-decorators';
import { MarvelCommonsService } from '../commons';
import { MarvelService } from '../marvel-service.service';

@Injectable({
  providedIn: 'root',
})
export class Marveli18nConfigService extends MarvelCommonsService {
  constructor(marvelService: MarvelService, private translateService: TranslateService) {
    super(marvelService);

    this.translateService.addLangs(['pt-BR', 'en-US']);
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.applyLocal();
  }

  private applyLocal() {
    registerLocaleData(localePTBR, 'pt-PT');
    registerLocaleData(localeENUS, 'en-US');
  }

  @MarvelCoreService({
    httpResponse: {
      httpCodeIgnore: [404],
    },
    requestInProgress: {
      showProgress: false,
    },
  })
  public apply(params: MarvelConfig) {
    const { marvelService } = this;
    const { i18n } = params;

    marvelService.get<any>(`${environment.urlSettings}/i18n/${i18n.lang}.json`).subscribe(
      (config: any) => {
        const { lang, data } = config;
        this.translateService.setTranslation(lang, data, true);
      },
      (err: HttpErrorResponse) => {
        console.error(`i18n ${i18n.lang} not found!`);
        throwError(err);
      }
    );
  }
}
