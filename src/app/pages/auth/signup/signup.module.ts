import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLanguageChoseModule } from 'app/shared/components';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import { MarvelInputModule, MarvelIconModule, MarvelButtonModule } from 'marvel-style';
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
        resolve: {
          SignupService,
        },
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
    SharedLanguageChoseModule,
  ],
  providers: [SignupService],
})
export class SignupModule {}
