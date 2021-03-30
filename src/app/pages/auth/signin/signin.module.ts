import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLanguageChoseModule } from 'app/shared/components';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import { MarvelInputModule, MarvelIconModule, MarvelButtonModule } from 'marvel-style';
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
        resolve: {
          SigninService,
        },
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
    SharedLanguageChoseModule,
  ],
  providers: [SigninService],
})
export class SigninModule {}
