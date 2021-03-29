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
import { DetailsService, DetailsCharactersService } from './providers';

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
        resolve: {
          DetailsService,
          DetailsCharactersService,
        },
      },
    ]),
    TranslateModule.forChild(),
    SharedListContentDetailsModule,
  ],
  providers: [DetailsService, DetailsCharactersService],
})
export class DetailsModule {}
