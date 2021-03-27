import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedOutDetailsLayoutComponent } from 'app/layouts/main/logged-out-details/logged-out-details-layout.component';
import { LoggedOutDetailsLayoutModule } from 'app/layouts/main/logged-out-details/logged-out-details-layout.module';
import { LoggedOutLayoutComponent } from 'app/layouts/main/logged-out/logged-out-layout.component';
import { LoggedOutLayoutModule } from 'app/layouts/main/logged-out/logged-out-layout.module';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';

@NgModule({
  imports: [
    MarvelCoreCommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'logged-out',
      },
      {
        path: 'logged-out',
        children: [
          {
            path: '',
            component: LoggedOutLayoutComponent,
            loadChildren: () => {
              return import('./logged-out').then((m: any) => {
                return m.LoggedOutModule;
              });
            },
          },
          {
            path: 'details',
            component: LoggedOutDetailsLayoutComponent,
            loadChildren: () => {
              return import('../commons').then((m: any) => {
                return m.DetailsModule;
              });
            },
          },
        ],
      },
    ]),
    LoggedOutLayoutModule,
    LoggedOutDetailsLayoutModule,
  ],
  declarations: [],
})
export class PagesMainModule {}
