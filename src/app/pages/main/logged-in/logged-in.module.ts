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
      {
        path: 'my-comics',
        loadChildren: () => {
          return import('./my-comics').then((m: any) => {
            return m.MyComicsModule;
          });
        },
      },
      {
        path: 'my-favorites',
        loadChildren: () => {
          return import('./my-favorites').then((m: any) => {
            return m.MyFavoritesModule;
          });
        },
      },
      {
        path: 'my-orders',
        loadChildren: () => {
          return import('./my-orders').then((m: any) => {
            return m.MyOrdersModule;
          });
        },
      },
    ]),
  ],
  declarations: [],
})
export class LoggedInModule {}
