import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MarvelRequestLoadingInProgress } from 'app/interfaces';
import { SharedProgressBarService } from 'app/shared/components';
import { MarvelHandlingService } from '../services/marvel-handling.service';
import { MarvelUtils } from 'marvel-style';

@Injectable()
export class MarvelHttpConfigLoadingInProgressInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
    // no to do
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { injector, isLoadingInProgressProperty } = this;
    const handlingService: MarvelHandlingService = injector.get(MarvelHandlingService);
    const progressBarService: SharedProgressBarService = injector.get(SharedProgressBarService);

    const inProgress: MarvelRequestLoadingInProgress = handlingService.getMarvelServiceCredentials()
      ? handlingService.getMarvelServiceCredentials().requestInProgress
      : null;
    if (isLoadingInProgressProperty(inProgress)) {
      progressBarService.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (isLoadingInProgressProperty(inProgress)) {
          progressBarService.hide();
        }
      })
    );
  }

  private isLoadingInProgressProperty(mlp: MarvelRequestLoadingInProgress): boolean {
    return MarvelUtils.persistNullEmptyUndefined(mlp) &&
      MarvelUtils.persistNullEmptyUndefined(mlp.showProgress)
      ? mlp.showProgress
      : true;
  }
}
