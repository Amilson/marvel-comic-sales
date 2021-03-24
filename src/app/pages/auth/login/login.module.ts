import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelCoreFormsModule } from 'app/shared/modules/marvel-core-forms.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: ':username',
        component: LoginComponent,
        resolve: {
          LoginService,
        },
      },
    ]),
    TranslateModule.forChild(),
  ],
  providers: [LoginService],
})
export class LoginModule {}
