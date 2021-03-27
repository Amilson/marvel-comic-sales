import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedListContentDetailsModule } from 'app/shared/components';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
} from '../../../../../projects/marvel-style/src/public-api';
import { DetailsComponent } from './details.component';
import { DetailsService } from './details.service';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailsComponent,
      },
    ]),
    TranslateModule.forChild(),
    SharedListContentDetailsModule,
  ],
  providers: [DetailsService],
})
export class DetailsModule {}
