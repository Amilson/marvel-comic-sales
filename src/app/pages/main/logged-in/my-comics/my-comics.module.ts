import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  SharedFilterModule,
  SharedFilteredModule,
  SharedListContentModule,
  SharedComicsRegisterFilterCharactersService,
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
  MarvelProgressModule,
} from 'marvel-style';
import { MyComicsComponent } from './my-comics.component';
import { SharedFilterCharactersService } from 'app/shared/components/filter';
import {
  SharedComicsRegisterComponent,
  SharedComicsDeleteComponent,
  SharedComicsRegisterFilterComicsService,
  SharedComicsRegisterComicsService,
} from 'app/shared/components';
import { MyComicsService } from './providers';

@NgModule({
  declarations: [MyComicsComponent, SharedComicsRegisterComponent, SharedComicsDeleteComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyComicsComponent,
        resolve: {
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
          MyComicsService,
        },
      },
      {
        path: 'refresh/:refresh',
        component: MyComicsComponent,
        resolve: {
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
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
    MarvelProgressModule,
  ],
  providers: [
    MyComicsService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterFilterCharactersService,
    SharedComicsRegisterComicsService,
    MyComicsService,
  ],
})
export class MyComicsModule {}
