import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [MarvelCoreCommonModule, TranslateModule.forChild()],
  exports: [FooterComponent],
})
export class FooterModule {}
