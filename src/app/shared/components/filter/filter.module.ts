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
import { SharedFilterComponent } from './filter.component';
import { SharedFilterCharactersService } from './providers';

@NgModule({
  declarations: [SharedFilterComponent],
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
  exports: [SharedFilterComponent],
  providers: [SharedFilterCharactersService],
})
export class SharedFilterModule {}
