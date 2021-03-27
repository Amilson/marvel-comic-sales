import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelButtonModule } from '../../../../../projects/marvel-style/src/public-api';
import { ToolbarLoggedOutComponent } from './toolbar-logged-out.component';

@NgModule({
  declarations: [ToolbarLoggedOutComponent],
  imports: [MarvelCoreCommonModule, RouterModule, TranslateModule.forChild(), MarvelButtonModule],
  exports: [ToolbarLoggedOutComponent],
})
export class ToolbarLoggedOutModule {}
