import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  SharedComicsRegisterComicsService,
  SharedComicsRegisterFilterComicsService,
  SharedFilteredModule,
  SharedFilterModule,
  SharedListContentModule,
} from 'app/shared/components';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
  MarvelStyleModalService,
} from '../../../../../../projects/marvel-style/src/public-api';
import { HomeComponent } from './home.component';
import { HomeService } from './providers';
import { SharedFilterCharactersService } from 'app/shared/components/filter';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        resolve: {
          HomeService,
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
        },
      },
    ]),
    TranslateModule.forChild(),
    SharedFilterModule,
    SharedFilteredModule,
    SharedListContentModule,
  ],
  providers: [
    HomeService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterComicsService,
  ],
})
export class HomeModule {}
