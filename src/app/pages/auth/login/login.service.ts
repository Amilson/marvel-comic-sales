import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { AuthCredentials, MarvelConfig } from 'app/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class LoginService extends MarvelCommonsService implements Resolve<any> {
  constructor(marvelService: MarvelService) {
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

  public login(param: AuthCredentials, config: MarvelConfig) {
    const { __data } = this;
    const data = {
      ...param,
      username: __data.username,
    };
    this.__onLoadingInProgress$.next(true);
    /*this.authenticationService.login(data, config).subscribe(
      () => {},
      () => {
        this.__onLoadingInProgress$.next(false);
      }
    );*/
  }
}
