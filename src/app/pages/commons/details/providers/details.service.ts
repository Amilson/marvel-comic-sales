import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { MarvelDiscoveryParamsService } from 'app/core/services/routes';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class DetailsService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private marvelDiscovery: MarvelDiscoveryParamsService,
    private router: Router
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const { router, marvelDiscovery } = this;
    this.__data = null;
    this.__page = null;

    const comicData = marvelDiscovery.getDataFromCurrentNavigation('comicData');

    if (!comicData) {
      router.navigate(['/main/logged-out']);
      return;
    }

    setTimeout(() => {
      this.__data = {
        ...comicData,
      };
      this.__onDataChanged$.next(null);
      this.__onLoadingInProgress$.next(false);
    }, 10);

    return of(null);
  }
}
