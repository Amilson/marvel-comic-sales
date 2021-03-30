import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelIconModule } from 'marvel-style';
import { SharedSocialMediaComponent } from './social-media.component';

@NgModule({
  declarations: [SharedSocialMediaComponent],
  imports: [MarvelCoreCommonModule, MarvelIconModule],
  exports: [SharedSocialMediaComponent],
})
export class SharedSocialMediaModule {}
