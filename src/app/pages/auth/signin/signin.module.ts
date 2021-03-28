import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import {
  MarvelInputModule,
  MarvelIconModule,
  MarvelButtonModule,
} from '../../../../../projects/marvel-style/src/public-api';
import { SigninComponent } from './signin.component';
import { SigninService } from './signin.service';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SigninComponent,
      },
      {
        path: ':username',
        component: SigninComponent,
        resolve: {
          SigninService,
        },
      },
    ]),
    TranslateModule.forChild(),
  ],
  providers: [SigninService],
})
export class SigninModule {}
