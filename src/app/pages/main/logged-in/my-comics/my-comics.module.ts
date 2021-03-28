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
import { MyComicsComponent } from './my-comics.component';
import { SharedFilterCharactersService } from 'app/shared/components/filter';
import { MyComicsRegisterComponent } from './modal';
import {
  MyComicsRegisterFilterComicsService,
  MyComicsRegisterComicsService,
  MyComicsService,
} from './providers';

@NgModule({
  declarations: [MyComicsComponent, MyComicsRegisterComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyComicsComponent,
        resolve: {
          SharedFilterCharactersService,
          MyComicsRegisterFilterComicsService,
          MyComicsService,
        },
      },
    ]),
    TranslateModule.forChild(),
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
    MyComicsService,
    MarvelStyleModalService,
    MyComicsRegisterFilterComicsService,
    MyComicsRegisterComicsService,
    MyComicsService,
  ],
})
export class MyComicsModule {}
