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
import { CheckoutSuccessComponent } from './checkout-success.component';
import { CheckoutSuccessService } from './providers';

@NgModule({
  declarations: [CheckoutSuccessComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutSuccessComponent,
        resolve: {
          CheckoutSuccessService,
        },
      },
    ]),
    TranslateModule.forChild(),
    SharedListContentDetailsModule,
  ],
  providers: [
    CheckoutSuccessService,
    MarvelStyleModalService,
    SharedComicsRegisterFilterComicsService,
    SharedComicsRegisterFilterCharactersService,
    SharedComicsRegisterComicsService,
  ],
})
export class CheckoutSuccessModule {}
