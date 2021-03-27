import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { SharedProgressBarModule } from 'app/shared/components';
import { LoggedOutLayoutComponent } from './logged-out-layout.component';
import { ContentModule } from 'app/layouts/components/content/content.module';
import { FooterModule } from 'app/layouts/components/footer/footer.module';
import { ToolbarLoggedOutModule } from 'app/layouts/components';
import { MarvelDirectivesModule } from 'app/core/directives';

@NgModule({
  declarations: [LoggedOutLayoutComponent],
  imports: [
    MarvelCoreCommonModule,
    ContentModule,
    ToolbarLoggedOutModule,
    FooterModule,
    SharedProgressBarModule,
    MarvelDirectivesModule,
  ],
  exports: [LoggedOutLayoutComponent],
})
export class LoggedOutLayoutModule {}
