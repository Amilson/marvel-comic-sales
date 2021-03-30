import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { SharedLanguageChoseComponent } from './language-choose.component';

@NgModule({
  declarations: [SharedLanguageChoseComponent],
  imports: [MarvelCoreCommonModule],
  exports: [SharedLanguageChoseComponent],
})
export class SharedLanguageChoseModule {}
