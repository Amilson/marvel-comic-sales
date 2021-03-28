import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
} from '../../../../../projects/marvel-style/src/public-api';
import { SharedListContentComponent } from './list-content.component';
import { SharedListContentCoverComponent } from './cover';
import { SharedListContentFooterComponent } from './footer';
import { SharedListContentHeaderComponent } from './header';
import { MarvelPipesModule } from 'app/core/pipes/marvel-pipes.module';

@NgModule({
  declarations: [
    SharedListContentComponent,
    SharedListContentCoverComponent,
    SharedListContentFooterComponent,
    SharedListContentHeaderComponent,
  ],
  imports: [
    MarvelCoreCommonModule,
    RouterModule,
    TranslateModule.forChild(),
    MarvelPipesModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
  ],
  exports: [SharedListContentComponent],
})
export class SharedListContentModule {}
