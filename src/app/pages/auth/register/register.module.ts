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
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    MarvelCoreCommonModule,
    MarvelCoreFormsModule,
    MarvelInputModule,
    MarvelIconModule,
    MarvelButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
      },
      {
        path: ':username',
        component: RegisterComponent,
        resolve: {
          RegisterService,
        },
      },
    ]),
    TranslateModule.forChild(),
  ],
  providers: [RegisterService],
})
export class RegisterModule {}
