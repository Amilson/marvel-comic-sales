import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [MarvelProgressBarComponent],
  imports: [MarvelCoreCommonModule],
  exports: [MarvelProgressBarComponent],
})
export class MarvelProgressBarModule {}
