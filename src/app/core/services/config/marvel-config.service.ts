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
import { MarvelSplashScreenService } from '../splash-screen/MARVEL-splash-screen.service';
import { MarvelServiceWorkerConfigService } from './marvel-service-worker-config.service';
import { MarvelMaintenanceConfigService } from './marvel-maintenance-config.service';

@Injectable({
  providedIn: 'root',
})
export class MarvelConfigService extends MarvelCommonsService {
  private readonly configSubject$: BehaviorSubject<MarvelConfig>;

  private readonly configBoostrapSubject$: BehaviorSubject<MarvelConfig>;

  constructor(
    marvelService: MarvelService,
    private marveli18nConfigService: Marveli18nConfigService,
    private marvelSplashScreenService: MarvelSplashScreenService,
    private marvelServiceWorkerConfigService: MarvelServiceWorkerConfigService,
    private marvelMaintenanceConfigService: MarvelMaintenanceConfigService
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

  private getWhiteLabelSettings(marvelCode: string, configBoostrap: MarvelConfigBoostrap = null) {
    const { marvelService, marveli18nConfigService, configSubject$, internalValidations } = this;
    marvelService
      .get<any>(`${environment.urlSettings}/marvelecx/${marvelCode.toLowerCase()}/white-label.json`)
      .subscribe(
        (config: MarvelConfig) => {
          marveli18nConfigService.apply(config);
          /*marvelStyleGuideSettingsService.boostrap(
            `${
              environment.urlSettings
            }/marvelecx/${marvelCode.toLowerCase()}/marvel-style-guide-settings.json`,
            internalValidations.bind(this, configBoostrap)
          );*/
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
    const { marvelService, configBoostrapSubject$ } = this;

    marvelService
      .get(
        `${environment.urlSettings}/settings/boostrap.json?t=${
          /*TODO MarvelUtils.getRandomString(30)*/ 1
        }`
      )
      .subscribe(
        (resp: any) => {
          /*if (marvelCode) {
            this.getWhiteLabelSettings(marvelCode, body);
            configBoostrapSubject$.next(body);
          } else {
            console.error(`Boostrap ${marvelCode} Configuration not found!`);
          }*/
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
