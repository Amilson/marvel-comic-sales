import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';
import { MarvelIconModule } from 'marvel-style';
import { SharedLanguageChoseModule, SharedSocialMediaModule } from 'app/shared/components';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    MarvelCoreCommonModule,
    TranslateModule.forChild(),
    MarvelIconModule,
    SharedLanguageChoseModule,
    SharedSocialMediaModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
