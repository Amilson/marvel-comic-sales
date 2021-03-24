import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthLayoutModule } from './layouts/auth/auth-layout.module';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          children: [
            {
              path: '',
              redirectTo: '/auth/login',
              pathMatch: 'full',
            },
          ],
        },
        {
          path: 'auth',
          component: AuthLayoutComponent,
          loadChildren: () => {
            return import('app/pages/auth/auth.module').then((m: any) => {
              return m.PagesAuthModule;
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
