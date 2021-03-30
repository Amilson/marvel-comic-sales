import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelAuthService } from 'app/core/services/auth';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { MarvelDiscoveryParamsService } from 'app/core/services/routes';
import { SigninCredentials, MarvelDataAfterLogin } from 'app/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class SigninService extends MarvelCommonsService implements Resolve<any> {
  private dataAfterLogin: MarvelDataAfterLogin;

  constructor(
    marvelService: MarvelService,
    private authService: MarvelAuthService,
    private marvelDiscovery: MarvelDiscoveryParamsService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const { marvelDiscovery } = this;
    this.__data = null;
    this.__page = null;
    this.__data = route.params;

    this.dataAfterLogin = marvelDiscovery.getDataFromCurrentNavigation('dataAfterLogin');

    this.__onDataChanged$.next(null);
    this.__onLoadingInProgress$.next(false);
    return of(null);
  }

  private handleSignin() {
    const { dataAfterLogin } = this;
    if (dataAfterLogin) {
      const { type, data } = dataAfterLogin;
      this[type](this.fireAuth, this.firestore, this.router, data);
    } else {
      this.router.navigate(['/main/logged-in']);
    }
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
      .then(() => {
        this.handleSignin();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }

  facebookSignin() {
    this.__onLoadingInProgress$.next(true);
    this.authService
      .facebookSignin()
      .then(() => {
        this.handleSignin();
        this.__onLoadingInProgress$.next(false);
      })
      .catch((err: any) => {
        this.__onLoadingInProgress$.next(false);
        this.handleError(err);
      });
  }

  signup() {
    this.router.navigate(['/auth/signup'], {
      state: {
        dataAfterLogin: {
          ...this.dataAfterLogin,
        },
      },
    });
  }
}
