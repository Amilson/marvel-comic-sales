import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        loadChildren: () => import('./login').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./register').then((m) => m.RegisterModule),
      },
    ]),
  ],
})
export class PagesAuthModule {}
