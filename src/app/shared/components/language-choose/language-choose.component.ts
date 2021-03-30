import { Component, ViewEncapsulation } from '@angular/core';
import { Marveli18nConfigService } from 'app/core/services/config';

@Component({
  selector: 'shared-language-choose',
  templateUrl: './language-choose.component.html',
  styleUrls: ['./language-choose.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedLanguageChoseComponent {
  _languages = ['pt-BR', 'en-US'];

  constructor(private serviceConfigI18n: Marveli18nConfigService) {
    //not to do
  }

  onChangeLanguage(lang: string) {
    this.serviceConfigI18n.apply({
      i18n: {
        currency: '',
        lang,
      },
    });
  }
}
