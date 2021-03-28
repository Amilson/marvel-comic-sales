import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelButtonModule } from '../../../../../projects/marvel-style/src/public-api';
import { ToolbarLoggedInComponent } from './toolbar-logged-in.component';

@NgModule({
  declarations: [ToolbarLoggedInComponent],
  imports: [MarvelCoreCommonModule, RouterModule, TranslateModule.forChild(), MarvelButtonModule],
  exports: [ToolbarLoggedInComponent],
})
export class ToolbarLoggedInModule {}
