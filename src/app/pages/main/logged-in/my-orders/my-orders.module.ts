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
import { MyOrdersComponent } from './my-orders.component';
import { SharedFilterCharactersService } from 'app/shared/components/filter';
import {
  SharedComicsRegisterFilterComicsService,
  SharedComicsRegisterComicsService,
} from 'app/shared/components';
import { MyOrdersService } from './providers';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyOrdersComponent,
        resolve: {
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
          MyOrdersService,
        },
      },
      {
        path: 'refresh/:refresh',
        component: MyOrdersComponent,
        resolve: {
          SharedFilterCharactersService,
          SharedComicsRegisterFilterComicsService,
          MyOrdersService,
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
    MyOrdersService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterFilterCharactersService,
    SharedComicsRegisterComicsService,
    MyOrdersService,
  ],
})
export class MyOrdersModule {}
