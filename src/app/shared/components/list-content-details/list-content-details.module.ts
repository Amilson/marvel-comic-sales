import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
} from '../../../../../projects/marvel-style/src/public-api';
import { SharedListContentDetailsComponent } from './list-content-details.component';
import { SharedListContentDetailsCoverComponent } from './cover';
import { SharedListContentDetailsFooterComponent } from './footer';
import { SharedListContentDetailsHeaderComponent } from './header';
import { SharedListContentDetailsCharacterComponent } from './character';
import { MarvelPipesModule } from 'app/core/pipes/marvel-pipes.module';

@NgModule({
  declarations: [
    SharedListContentDetailsComponent,
    SharedListContentDetailsCoverComponent,
    SharedListContentDetailsFooterComponent,
    SharedListContentDetailsHeaderComponent,
    SharedListContentDetailsCharacterComponent,
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
  exports: [SharedListContentDetailsComponent],
})
export class SharedListContentDetailsModule {}
