import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MarvelConfigBoostrap } from 'app/interfaces';
import { SharedVersionChangedComponent } from 'app/shared/components/modal/version-changed';
import { MarvelStyleModalService } from 'marvel-style';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarvelServiceWorkerConfigService {
  constructor(
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private modalService: MarvelStyleModalService
  ) {
    // not to do
  }

  private handleValidation(config: MarvelConfigBoostrap) {
    const { updates, modalService } = this;
    updates?.available?.subscribe(() => {
      if (!config.showNewVersion || config.maintenance.closed) {
        document.location.reload();
      } else {
        modalService.open(SharedVersionChangedComponent, {
          color: 'theme',
          size: 'md',
        });
      }
    });
  }

  private verify() {
    const { appRef, updates } = this;
    const appIsStable$ = appRef.isStable.pipe(
      first((isStable: boolean) => {
        return isStable === true;
      })
    );
    const everyHour$ = interval(1 * 60 * 60 * 1000);
    const everyHourOnceAppIsStable$ = concat(appIsStable$, everyHour$);
    everyHourOnceAppIsStable$.subscribe(() => {
      updates.checkForUpdate();
    });
    updates.checkForUpdate();
  }

  public apply(config: MarvelConfigBoostrap) {
    this.handleValidation(config);
    this.verify();
  }
}
