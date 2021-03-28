import { NgModule } from '@angular/core';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';
import { SharedProgressBarModule } from 'app/shared/components';
import { LoggedInDetailsLayoutComponent } from './logged-in-details-layout.component';
import { ContentModule } from 'app/layouts/components/content/content.module';
import { FooterModule } from 'app/layouts/components/footer/footer.module';
import { ToolbarLoggedInModule } from 'app/layouts/components';
import { MarvelDirectivesModule } from 'app/core/directives';

@NgModule({
  declarations: [LoggedInDetailsLayoutComponent],
  imports: [
    MarvelCoreCommonModule,
    ContentModule,
    ToolbarLoggedInModule,
    FooterModule,
    SharedProgressBarModule,
    MarvelDirectivesModule,
  ],
  exports: [LoggedInDetailsLayoutComponent],
})
export class LoggedInDetailsLayoutModule {}
