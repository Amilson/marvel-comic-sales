import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { MarvelAuthService } from './marvel-auth.service';

@Injectable({
  providedIn: 'root',
})
export class MarvelAuthGuardLoggedout implements CanActivate {
  constructor(private authService: MarvelAuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        return !user;
      }),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/main/logged-in']);
        }
      })
    );
  }
}
