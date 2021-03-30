import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarvelAuthGuard, MarvelAuthGuardLoggedout } from 'app/core/services/auth';
import { LoggedInCheckoutLayoutComponent } from 'app/layouts/main/logged-in-checkout/logged-in-checkout-layout.component';
import { LoggedInCheckoutLayoutModule } from 'app/layouts/main/logged-in-checkout/logged-in-checkout-layout.module';
import { LoggedInDetailsLayoutComponent } from 'app/layouts/main/logged-in-details/logged-in-details-layout.component';
import { LoggedInDetailsLayoutModule } from 'app/layouts/main/logged-in-details/logged-in-details-layout.module';
import { LoggedInLayoutComponent } from 'app/layouts/main/logged-in/logged-in-layout.component';
import { LoggedInLayoutModule } from 'app/layouts/main/logged-in/logged-in-layout.module';
import { LoggedOutCheckoutLayoutComponent } from 'app/layouts/main/logged-out-checkout/logged-out-checkout-layout.component';
import { LoggedOutCheckoutLayoutModule } from 'app/layouts/main/logged-out-checkout/logged-out-checkout-layout.module';
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
          {
            path: 'checkout',
            component: LoggedOutCheckoutLayoutComponent,
            loadChildren: () => {
              return import('../commons').then((m: any) => {
                return m.CheckoutModule;
              });
            },
          },
        ],
        canActivate: [MarvelAuthGuardLoggedout],
      },
      {
        path: 'logged-in',
        children: [
          {
            path: '',
            component: LoggedInLayoutComponent,
            loadChildren: () => {
              return import('./logged-in').then((m: any) => {
                return m.LoggedInModule;
              });
            },
          },
          {
            path: 'details',
            component: LoggedInDetailsLayoutComponent,
            loadChildren: () => {
              return import('../commons').then((m: any) => {
                return m.DetailsModule;
              });
            },
          },
          {
            path: 'checkout',
            component: LoggedInCheckoutLayoutComponent,
            loadChildren: () => {
              return import('../commons').then((m: any) => {
                return m.CheckoutModule;
              });
            },
          },
          {
            path: 'checkout-success',
            component: LoggedInCheckoutLayoutComponent,
            loadChildren: () => {
              return import('../commons').then((m: any) => {
                return m.CheckoutSuccessModule;
              });
            },
          },
        ],
        canActivate: [MarvelAuthGuard],
      },
    ]),
    LoggedOutLayoutModule,
    LoggedOutDetailsLayoutModule,
    LoggedOutCheckoutLayoutModule,
    LoggedInLayoutModule,
    LoggedInDetailsLayoutModule,
    LoggedInCheckoutLayoutModule,
  ],
  declarations: [],
})
export class PagesMainModule {}
