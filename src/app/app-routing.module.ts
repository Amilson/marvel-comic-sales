import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarvelAuthGuardLogin } from './core/services/auth';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthLayoutModule } from './layouts/auth/auth-layout.module';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'main',
          pathMatch: 'full',
        },
        {
          path: 'auth',
          component: AuthLayoutComponent,
          loadChildren: () => {
            return import('app/pages/auth').then((m: any) => {
              return m.PagesAuthModule;
            });
          },
          canActivate: [MarvelAuthGuardLogin],
        },
        {
          path: 'main',
          loadChildren: () => {
            return import('app/pages/main').then((m: any) => {
              return m.PagesMainModule;
            });
          },
        },
      ],
      { relativeLinkResolution: 'legacy' }
    ),
    AuthLayoutModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
