import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
} from '../../../../../projects/marvel-style/src/public-api';
import { SharedFilterComponent } from './filter.component';

@NgModule({
  declarations: [SharedFilterComponent],
  imports: [
    MarvelCoreCommonModule,
    RouterModule,
    TranslateModule.forChild(),
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
  ],
  exports: [SharedFilterComponent],
})
export class SharedFilterModule {}
