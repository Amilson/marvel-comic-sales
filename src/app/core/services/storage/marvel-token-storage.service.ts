import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MarvelTokenCredentials, MarvelConfig } from 'app/interfaces';
import { MarvelConfigService } from '../config/marvel-config.service';

@Injectable({
  providedIn: 'root',
})
export class MarvelTokenStorageService {
  private token: MarvelTokenCredentials;

  private token$: BehaviorSubject<MarvelTokenCredentials>;

  private config: MarvelConfig = null;

  constructor(private marvelConfigService: MarvelConfigService) {
    //TODO
    this.token = {
      username: '',
      program: '',
      accessToken: '',
      refreshToken: '',
      companyId: '',
      governmentId: '',
      companyTypeUrl: '',
      companyType: '',
      programAdmin: false,
      programType: '',
      role: '',
      _clearIgnore: {
        ignore: ['username', 'program'],
      },
    };
    this.token$ = new BehaviorSubject(null);

    this.marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this.config = _;
    });
  }

  private setAllTokens(token: MarvelTokenCredentials) {
    const { token$ } = this;
    Object.entries(token).forEach(([key, value]) => {
      /*if (MarvelUtils.persistNullEmptyUndefined(value)) {
        localStorage.setItem(key, value);
      }*/
    });
    token$.next(token);
  }

  private getAllTokens(): MarvelTokenCredentials {
    const { token } = this;
    const handledToken = {
      ...token,
    };
    Object.entries(token).forEach(([key, value]) => {
      handledToken[key] = localStorage.getItem(key);
    });

    return handledToken;
  }

  public tokenHasChanged(): Observable<MarvelTokenCredentials> {
    return this.token$.asObservable();
  }

  public getToken(): MarvelTokenCredentials {
    return this.getAllTokens();
  }

  public setToken(token: MarvelTokenCredentials) {
    this.setAllTokens(token);
  }

  public clear(force?: boolean): Observable<boolean> {
    const { token } = this;
    try {
      Object.entries(token).forEach(([key, value]) => {
        if (
          token._clearIgnore.ignore.filter((val) => {
            return val === key;
          }).length <= 0 ||
          force === true
        ) {
          localStorage.removeItem(key);
        }
      });
      localStorage.removeItem('me');
    } catch (error) {
      return of(false);
    }
    return of(true);
  }
}
