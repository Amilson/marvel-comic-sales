import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class DetailsService extends MarvelCommonsService implements Resolve<any> {
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
}
