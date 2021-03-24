import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';

@NgModule({
  declarations: [ContentComponent],
  imports: [MarvelCoreCommonModule, RouterModule],
  exports: [ContentComponent],
})
export class ContentModule {}
