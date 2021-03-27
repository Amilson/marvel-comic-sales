import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { SharedProgressBarModule } from 'app/shared/components';
import { AuthLayoutComponent } from './auth-layout.component';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    MarvelCoreCommonModule,
    ContentModule,
    ToolbarModule,
    FooterModule,
    SharedProgressBarModule,
  ],
  declarations: [AuthLayoutComponent],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
