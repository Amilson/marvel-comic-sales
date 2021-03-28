import { MarvelRequestPaged } from 'app/interfaces';
import { HttpParams } from '@angular/common/http';

export class MarvelRequestPagedHandling {
  private url: string;

  private pagedParams: MarvelRequestPaged;

  constructor(_url?: string, _pagedParams?: MarvelRequestPaged) {
    this.url = _url;
    this.pagedParams = _pagedParams || {
      page: {},
    };
  }

  private handlePagedValuesFromApi(url: string) {
    if (url.search('\\?') < 0) return url;
    const params = url.substr(url.search('\\?') + 1, url.length);
    url = url.substr(0, url.search('\\?'));
    return `${url}?${new HttpParams({
      fromString: params,
    })
      .delete('size')
      .delete('page')
      .toString()}`;
  }

  private getUrlParams(url: string): string {
    const { pagedParams } = this;
    const { offset, limit } = pagedParams?.page;
    const hasInitialQueryParams = url.search('\\?') > 0;
    return `${!hasInitialQueryParams ? '?' : '&'}offset=${offset || 0}&limit=${limit || 20}`;
  }

  public getRequestWithPagedParams(): string {
    const { url } = this;
    const handled = this.handlePagedValuesFromApi(url);
    return `${handled}${this.getUrlParams(handled)}`;
  }
}
