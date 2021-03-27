import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarvelCoreCommonModule } from 'app/shared/modules/marvel-core-common.module';

@NgModule({
  imports: [
    MarvelCoreCommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => {
          return import('./home').then((m: any) => {
            return m.HomeModule;
          });
        },
      },
    ]),
  ],
  declarations: [],
})
export class LoggedOutModule {}
