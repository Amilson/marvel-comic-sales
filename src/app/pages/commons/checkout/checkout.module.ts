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
import { CheckoutComponent } from './checkout.component';
import { CheckoutService, CheckoutCharactersService } from './providers';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
        resolve: {
          CheckoutService,
          CheckoutCharactersService,
        },
      },
    ]),
    TranslateModule.forChild(),
    SharedListContentDetailsModule,
  ],
  providers: [
    CheckoutService,
    CheckoutCharactersService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterFilterCharactersService,
    SharedComicsRegisterComicsService,
  ],
})
export class CheckoutModule {}
