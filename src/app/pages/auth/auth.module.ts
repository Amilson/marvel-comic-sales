import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'signin',
        loadChildren: () => import('./signin').then((m) => m.SigninModule),
      },
      {
        path: 'signup',
        loadChildren: () => import('./signup').then((m) => m.SignupModule),
      },
    ]),
  ],
})
export class PagesAuthModule {}
