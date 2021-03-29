import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SharedComicsRegisterFilterComicsModel } from './register-filter-comics.model';
import { SharedComicsRegisterFilterSearchModel } from './register-filter-search.model';

@Injectable()
export class SharedComicsRegisterFilterComicsService
  extends MarvelCommonsService
  implements Resolve<any> {
  private route: string = `${environment.baseUrl}/comics`;

  constructor(marvelService: MarvelService) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(data: any[]) {
    if (!data) return null;
    return data.map((_: any) => {
      return new SharedComicsRegisterFilterComicsModel(_);
    });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  getData() {
    const { marvelService, route } = this;
    const url = `${route}?ts=1616467550322&apikey=266b9086b186aa8bda0442c48d6de198&hash=baa3a26cbe5ef790d5d07721e935da9a`;

    const _search = new SharedComicsRegisterFilterSearchModel({
      ...this.__search,
    });
    this.__onLoadingInProgress$.next(true);

    marvelService.get<any>(this.getNormalizedUrl(`${url}&${_search.buildParams()}`)).subscribe(
      (resp: any) => {
        const data = this.getResultsData(resp);
        const page = this.getPageData(resp);
        this.__data = [...(this.__data ? this.__data : []), ...this.mappingData(data)];
        this.__page = page;

        this.__onDataChanged$.next(null);
        this.__onLoadingInProgress$.next(false);
      },
      () => {
        this.__data = null;
        this.__page = {
          offset: 0,
          total: 0,
        };

        this.__onDataChanged$.next(null);
        this.__onLoadingInProgress$.next(false);
      }
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    super.resolve(route, state, {
      callbackMain: () => {
        this.__data = null;
        this.__page = null;
        this.getData();
      },
      callbackPagination: this.getData.bind(this),
    });

    return of(null);
  }

  setSearch(search: SharedComicsRegisterFilterSearchModel) {
    this.__data = null;
    this.__search = search;

    this.setPage({
      page: {
        offset: 0,
        total: 0,
      },
    });

    this.getData();
  }
}
