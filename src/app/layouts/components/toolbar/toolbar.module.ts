import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [MarvelCoreCommonModule, RouterModule, TranslateModule.forChild()],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
