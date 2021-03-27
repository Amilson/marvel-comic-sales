import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';
import { MarvelIconModule } from '../../../../../projects/marvel-style/src/public-api';

@NgModule({
  declarations: [FooterComponent],
  imports: [MarvelCoreCommonModule, TranslateModule.forChild(), MarvelIconModule],
  exports: [FooterComponent],
})
export class FooterModule {}
