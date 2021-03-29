import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  SharedFilterModule,
  SharedFilteredModule,
  SharedListContentModule,
} from 'app/shared/components';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
  MarvelModalModule,
  MarvelStyleModalService,
  MarvelSelectModule,
  MarvelOptionModule,
} from '../../../../../../projects/marvel-style/src/public-api';
import { MyFavoritesComponent } from './my-favorites.component';
import { SharedFilterCharactersService } from 'app/shared/components/filter';
import {
  SharedComicsRegisterFilterComicsService,
  SharedComicsRegisterComicsService,
} from 'app/shared/components';
import { MyFavoritesService } from './providers';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MyFavoritesComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyFavoritesComponent,
        resolve: {
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
          MyFavoritesService,
        },
      },
      {
        path: 'refresh/:refresh',
        component: MyFavoritesComponent,
        resolve: {
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
          MyFavoritesService,
        },
      },
    ]),
    TranslateModule.forChild(),
    DragDropModule,
    SharedFilterModule,
    SharedFilteredModule,
    SharedListContentModule,
    MarvelInputModule,
    MarvelSelectModule,
    MarvelOptionModule,
    MarvelIconModule,
    MarvelButtonModule,
    MarvelModalModule,
  ],
  providers: [
    MyFavoritesService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterComicsService,
    MyFavoritesService,
  ],
})
export class MyFavoritesModule {}
