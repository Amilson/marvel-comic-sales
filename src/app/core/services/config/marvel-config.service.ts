/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelConfig, MarvelConfigBoostrap } from 'app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Marveli18nConfigService } from './marvel-i18n-config.service';
import { MarvelSplashScreenService } from '../splash-screen/marvel-splash-screen.service';
import { MarvelServiceWorkerConfigService } from './marvel-service-worker-config.service';
import { MarvelMaintenanceConfigService } from './marvel-maintenance-config.service';
import {
  MarvelStyleSettingsService,
  MarvelUtils,
} from '../../../../../projects/marvel-style/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class MarvelConfigService extends MarvelCommonsService {
  private boostrapRoute: string = `${environment.urlSettings}/settings`;
  private themeRoute: string = `${environment.urlSettings}/settings/theme`;

  private readonly configSubject$: BehaviorSubject<MarvelConfig>;

  private readonly configBoostrapSubject$: BehaviorSubject<MarvelConfig>;

  constructor(
    marvelService: MarvelService,
    private marveli18nConfigService: Marveli18nConfigService,
    private marvelSplashScreenService: MarvelSplashScreenService,
    private marvelServiceWorkerConfigService: MarvelServiceWorkerConfigService,
    private marvelMaintenanceConfigService: MarvelMaintenanceConfigService,
    private marvelStyleSettingsService: MarvelStyleSettingsService
  ) {
    super(marvelService);
    this.configSubject$ = new BehaviorSubject(null);
    this.configBoostrapSubject$ = new BehaviorSubject(null);
  }

  private internalValidations(...args: any[]) {
    const {
      marvelSplashScreenService,
      marvelServiceWorkerConfigService,
      marvelMaintenanceConfigService,
    } = this;
    const configBoostrap = args[0];
    marvelSplashScreenService.hide();
    marvelServiceWorkerConfigService.apply(configBoostrap);
    marvelMaintenanceConfigService.apply(configBoostrap);
  }

  private getWhiteLabelSettings(configBoostrap: MarvelConfigBoostrap = null) {
    const {
      themeRoute,
      marvelService,
      marveli18nConfigService,
      marvelStyleSettingsService,
      configSubject$,
      internalValidations,
    } = this;
    marvelService.get<any>(`${themeRoute}/white-label.json`).subscribe(
      (config: MarvelConfig) => {
        marveli18nConfigService.apply(config);
        marvelStyleSettingsService.boostrap(
          `${themeRoute}/style.json`,
          internalValidations.bind(this, configBoostrap)
        );
        configSubject$.next(config);
      },
      (err: HttpErrorResponse) => {
        console.error('Program Configuration not found!');
        throwError(err);
      }
    );
  }

  @MarvelCoreService({
    httpResponse: {
      httpCodeIgnore: [404],
    },
    requestInProgress: {
      showProgress: false,
    },
  })
  public init() {
    const { marvelService, boostrapRoute, configBoostrapSubject$ } = this;

    marvelService
      .get(`${boostrapRoute}/boostrap.json?t=${MarvelUtils.getRandomString(30)}`)
      .subscribe(
        (resp: any) => {
          this.getWhiteLabelSettings(resp);
          configBoostrapSubject$.next(resp);
        },
        (err: HttpErrorResponse) => {
          console.error('Boostrap Configuration not found!');
          throwError(err);
        }
      );
  }

  public config(): Observable<any> {
    return this.configSubject$.asObservable();
  }

  public boostrapConfig(): Observable<any> {
    return this.configBoostrapSubject$.asObservable();
  }
}
