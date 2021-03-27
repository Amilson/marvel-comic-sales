import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { SharedProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [SharedProgressBarComponent],
  imports: [MarvelCoreCommonModule],
  exports: [SharedProgressBarComponent],
})
export class SharedProgressBarModule {}
