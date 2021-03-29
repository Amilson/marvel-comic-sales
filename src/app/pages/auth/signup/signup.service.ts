import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelAuthService } from 'app/core/services/auth';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { SignupCredentials } from 'app/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class SignupService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private authService: MarvelAuthService,
    private router: Router
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private handleSignup() {
    this.router.navigate(['/main/logged-in']);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    this.__data = null;
    this.__page = null;
    this.__data = route.params;
    this.__onDataChanged$.next(null);
    this.__onLoadingInProgress$.next(false);
    return null;
  }

  signup(param: SignupCredentials) {
    this.__onLoadingInProgress$.next(true);
    this.authService
      .signup(param)
      .then(() => {
        this.handleSignup();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }

  googleSignup() {
    this.__onLoadingInProgress$.next(true);
    this.authService
      .googleSignup()
      .then(() => {
        this.handleSignup();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }

  facebookSignup() {
    this.__onLoadingInProgress$.next(true);
    this.authService
      .facebookSignup()
      .then(() => {
        this.handleSignup();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }
}
