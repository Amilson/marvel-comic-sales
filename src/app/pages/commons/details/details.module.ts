import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  SharedComicsRegisterComicsService,
  SharedComicsRegisterFilterCharactersService,
  SharedComicsRegisterFilterComicsService,
  SharedListContentDetailsModule,
} from 'app/shared/components';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
  MarvelStyleModalService,
} from 'marvel-style';
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
  providers: [
    DetailsService,
    DetailsCharactersService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterFilterCharactersService,
    SharedComicsRegisterComicsService,
  ],
})
export class DetailsModule {}
