import { MarvelRequestPaged, MarvelTokenCredentials, MarvelTranslateOptions } from 'app/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MarvelService } from '../marvel-service.service';
import { MarvelTokenStorageService } from '../storage/marvel-token-storage.service';

export class MarvelCommonsService {
  //TODO criar interface para any

  __data: any | any[];

  __params: any | any[];

  __error: any;

  __page: any;

  __search: any;

  __requestPaged: MarvelRequestPaged = null;

  __onSearchChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onDataChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onLoadingInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  __onDataDeleted$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onErrorChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __oni18nDataChanged$: BehaviorSubject<any> = new BehaviorSubject(null);

  __onDoPagination$: BehaviorSubject<Function> = new BehaviorSubject(null);

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
    const { page } = this.__requestPaged;
    const { number, totalPages } = page;
    if (number < totalPages) {
      this.__requestPaged = {
        ...this.__requestPaged,
        page: {
          ...page,
          number: number + 1,
        },
      };
      return true;
    }
    return false;
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

    if (otherArgs?.callbackPagination) {
      this.__onDoPagination$.subscribe(() => {
        if (!this.__onLoadingInProgress$.value) {
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
