import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class SharedFilterService extends MarvelCommonsService implements Resolve<any> {
  private routeCharacters: string = `${environment.baseUrl}/characters`;

  constructor(marvelService: MarvelService) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  getData() {
    const { marvelService, routeCharacters } = this;
    const url = `${routeCharacters}?ts=1616467550322&apikey=266b9086b186aa8bda0442c48d6de198&hash=baa3a26cbe5ef790d5d07721e935da9a`;

    this.__onLoadingInProgress$.next(true);

    marvelService.get<any>(`${url}`).subscribe(
      (resp: any) => {
        const data = this.getResultsData(resp);
        const page = this.getPageData(resp);

        this.__data = [...(this.__data ? this.__data : []), ...data];
        this.__page = page;

        this.__onDataChanged$.next(null);
        this.__onLoadingInProgress$.next(false);
      },
      () => {
        this.__data = null;
        this.__page = { offset: 0, total: 0 };

        this.__onDataChanged$.next(null);
        this.__onLoadingInProgress$.next(false);
      }
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    this.__data = null;
    this.__page = null;
    this.__data = route.params;
    this.__onDataChanged$.next(null);
    this.__onLoadingInProgress$.next(false);
    this.getData();
    return of(null);
  }
}
