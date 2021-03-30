import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { MarvelDiscoveryParamsService } from 'app/core/services/routes';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutCharactersModel } from './checkout-characters.model';

@Injectable()
export class CheckoutCharactersService extends MarvelCommonsService implements Resolve<any> {
  private route: string = `${environment.baseUrl}/comics/{comicId}/characters`;

  constructor(
    marvelService: MarvelService,
    private marvelDiscovery: MarvelDiscoveryParamsService,
    private router: Router
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(data: any[]) {
    if (!data) return null;
    return data.map((_: any) => {
      return new CheckoutCharactersModel(_);
    });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  private getData(comic: any) {
    const { marvelService, route } = this;
    let url = `${route}?ts=1616467550322&apikey=266b9086b186aa8bda0442c48d6de198&hash=baa3a26cbe5ef790d5d07721e935da9a`;
    //url = url.replace('{comicId}', comic.comicId);
    url = url.replace('{comicId}', '6181');

    this.__onLoadingInProgress$.next(true);

    marvelService.get<any>(this.getNormalizedUrl(`${url}`)).subscribe(
      (resp: any) => {
        const data = this.getResultsData(resp);
        const page = this.getPageData(resp);
        this.__data = this.mappingData(data);
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
    const { router, marvelDiscovery } = this;
    this.__data = null;
    this.__page = null;

    const comicData = marvelDiscovery.getDataFromCurrentNavigation('comicData');

    if (!comicData) {
      router.navigate(['/main/logged-out']);
      return;
    }

    this.getData(comicData);

    return of(null);
  }
}
