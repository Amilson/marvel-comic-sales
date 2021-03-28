import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelAuthService } from 'app/core/services/auth';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { SigninCredentials, MarvelConfig } from 'app/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class SigninService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private authService: MarvelAuthService,
    private router: Router
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    this.__data = null;
    this.__page = null;
    this.__data = route.params;
    this.__onDataChanged$.next(null);
    this.__onLoadingInProgress$.next(false);
    return of(null);
  }

  private handleSignin() {
    this.router.navigate(['/main/logged-in']);
  }

  signin(param: SigninCredentials) {
    this.__onLoadingInProgress$.next(true);
    this.authService
      .signin(param)
      .then(() => {
        this.handleSignin();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }

  googleSignin() {
    this.__onLoadingInProgress$.next(true);
    this.authService
      .googleSignin()
      .then((resp) => {
        console.log(resp);
        //this.handleSignin();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }
}
