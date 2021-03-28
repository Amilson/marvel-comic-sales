import {
  MarvelRequestPaged,
  MarvelResponsePaged,
  MarvelTokenCredentials,
  MarvelTranslateOptions,
} from 'app/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MarvelService } from '../marvel-service.service';
import { MarvelTokenStorageService } from '../storage/marvel-token-storage.service';
import { MarvelRequestPagedHandling } from '../request-paged';

export class MarvelCommonsService {
  //TODO criar interface para any

  __data: any | any[];

  __params: any | any[];

  __error: any;

  __page: MarvelResponsePaged;

  __search: any;

  __requestPaged: MarvelRequestPaged = null;

  __onSearchChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onDataChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onLoadingInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  __onDataDeleted$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onErrorChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __oni18nDataChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onDoPagination$: BehaviorSubject<any> = new BehaviorSubject(null);

  __tokenCredentials: MarvelTokenCredentials;

  __i18n: any;

  constructor(
    public marvelService?: MarvelService,
    public tokenStorage?: MarvelTokenStorageService
  ) {
    //not to do
  }

  setPage(requestPaged: MarvelRequestPaged) {
    this.__requestPaged = {
      ...this.__requestPaged,
      ...requestPaged,
    };
    return this;
  }

  getNormalizedUrl(url: string): string {
    const { __requestPaged } = this;
    return new MarvelRequestPagedHandling(url, __requestPaged).getRequestWithPagedParams();
  }

  clear(clearData: boolean) {
    if (clearData) {
      this.__data = null;
      this.__params = null;
      this.__page = null;
    }
    this.__error = null;
  }

  nextPage(): boolean {
    if (!this.__requestPaged) return false;
    const { offset, total, limit } = this.__requestPaged?.page;
    const number = (offset || 0) / (limit || 0) + 1;
    if (offset < total) {
      this.__requestPaged = {
        ...this.__requestPaged,
        page: {
          ...this.__requestPaged?.page,
          offset: number * limit,
        },
      };
      return true;
    }
    return false;
  }

  getResultsData(result: any): any[] | any {
    const { data } = result;
    return data ? data?.results : null;
  }

  getPageData(result: any): any {
    const { data } = result;
    if (!data) return null;
    const { offset, limit, total, count } = data;
    return { offset, limit, total, count };
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    otherArgs?: {
      callbackMain: Function;
      router?: Router;
      security?: {
        roles: string[];
        byExclusion?: boolean;
      };
      callbackPagination?: Function;
      translateOptions?: MarvelTranslateOptions;
    }
  ) {
    this.__data = null;
    this.__page = null;

    if (this.tokenStorage) {
      this.__tokenCredentials = this.tokenStorage.getToken();
    }

    const { __requestPaged } = this;
    if (!__requestPaged) {
      this.setPage({
        page: { offset: 0, total: 0, number: 0 },
      });
    }

    if (otherArgs?.callbackPagination) {
      this.__onDoPagination$.subscribe((makePagination: boolean) => {
        if (!this.__onLoadingInProgress$.value && makePagination) {
          const hasMorePages = this.setPage({
            page: {
              ...this.__page,
            },
          }).nextPage();
          if (hasMorePages && otherArgs?.callbackPagination) otherArgs.callbackPagination();
        }
      });
    }

    if (otherArgs?.translateOptions) {
      const { service, keys } = otherArgs.translateOptions;
      this.geti18n(service, keys);
    }

    otherArgs?.callbackMain();
  }

  geti18n(translateService: TranslateService, keys: string | string[]) {
    translateService.getStreamOnTranslationChange(keys).subscribe((translations: any) => {
      this.__i18n = translations;
      this.__oni18nDataChanged$.next(null);
    });
  }
}
