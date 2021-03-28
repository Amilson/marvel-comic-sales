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
import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignupComponent,
      },
      {
        path: ':username',
        component: SignupComponent,
        resolve: {
          SignupService,
        },
      },
    ]),
    TranslateModule.forChild(),
  ],
  providers: [SignupService],
})
export class SignupModule {}
