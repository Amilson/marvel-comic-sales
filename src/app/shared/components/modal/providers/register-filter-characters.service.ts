import { Injectable } from '@angular/core';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedComicsRegisterFilterCharactersService extends MarvelCommonsService {
  private route: string = `${environment.baseUrl}/comics/{comicId}/characters`;

  constructor(marvelService: MarvelService) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(data: any[]) {
    if (!data) return null;
    data.push('');
    return data.map((_: any) => {
      return `${_.id ? _.id : ''}`;
    });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  getData(comicId: number) {
    const { marvelService, route } = this;
    let url = `${route}?ts=1616467550322&apikey=266b9086b186aa8bda0442c48d6de198&hash=baa3a26cbe5ef790d5d07721e935da9a`;
    url = url.replace('{comicId}', '6181');

    this.__onLoadingInProgress$.next(true);

    marvelService.get<any>(this.getNormalizedUrl(`${url}`)).subscribe(
      (resp: any) => {
        const data = this.getResultsData(resp);
        this.__data = this.mappingData(data);

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

  setSearch(comicId: number) {
    this.__data = null;

    this.setPage({
      page: {
        offset: 0,
        total: 0,
      },
    });

    this.getData(comicId);
  }
}
