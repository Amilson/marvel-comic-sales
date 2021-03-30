import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelPipesModule } from 'app/core/pipes/marvel-pipes.module';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { MarvelButtonModule } from 'marvel-style';
import { ToolbarLoggedInComponent } from './toolbar-logged-in.component';

@NgModule({
  declarations: [ToolbarLoggedInComponent],
  imports: [
    MarvelCoreCommonModule,
    RouterModule,
    TranslateModule.forChild(),
    MarvelPipesModule,
    MarvelButtonModule,
  ],
  exports: [ToolbarLoggedInComponent],
})
export class ToolbarLoggedInModule {}
