import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
  MarvelSelectModule,
  MarvelOptionModule,
} from '../../../../../projects/marvel-style/src/public-api';
import { SharedFilteredComponent } from './filtered.component';

@NgModule({
  declarations: [SharedFilteredComponent],
  imports: [
    MarvelCoreCommonModule,
    RouterModule,
    TranslateModule.forChild(),
    MarvelInputModule,
    MarvelSelectModule,
    MarvelOptionModule,
    MarvelIconModule,
    MarvelButtonModule,
  ],
  exports: [SharedFilteredComponent],
})
export class SharedFilteredModule {}
