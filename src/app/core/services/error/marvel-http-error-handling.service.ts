import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MarvelServiceCredentials } from 'app/interfaces';
import { MarvelCommonsService } from '../commons';
import { MarvelService } from '../marvel-service.service';
import { MarvelTokenStorageService } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class MarvelHttpErrorHandlingService extends MarvelCommonsService {
  constructor(
    marvelService: MarvelService,
    tokenStorage: MarvelTokenStorageService,
    private router: Router,
    private translateService: TranslateService
  ) {
    super(marvelService, tokenStorage);

    super.resolve(null, null);

    this.geti18n(this.translateService, ['SERVICES.WARNING']);
  }

  private isHttpCodeIgnoreMessage(tp: MarvelServiceCredentials, httpCode: number): boolean {
    //#TODO
    /*if (!persistNullEmptyUndefined(tp) && !tp?.httpResponse) {
      return false;
    }*/

    const found = tp?.httpResponse?.httpCodeIgnore?.indexOf(httpCode) > -1;

    return found;
  }

  private getMessageType(status: number): 'theme' | 'warning' | 'success' | 'error' | 'question' {
    if (status === 409 || status === 400) {
      return 'warning';
    }

    return 'error';
  }

  private handleMessage(error: HttpErrorResponse, mkc: MarvelServiceCredentials) {
    /*TODO
    const { snackbarService } = this;
    // eslint-disable-next-line camelcase
    const { notifications, error_description, message } = error.error;
    let customMessage = '';

    if (message) {
      customMessage = message;
    }

    // eslint-disable-next-line camelcase
    if (error_description) {
      // eslint-disable-next-line camelcase
      customMessage = error_description;
    }

    if (notifications) {
      customMessage = notifications;
    }

    if (!customMessage) {
      customMessage = this.__i18n['SERVICES.WARNING']['ERROR-HANDLING'].ERROR;
    }

    if (!this.isHttpCodeIgnoreMessage(mkc, error.status)) {
      snackbarService.show({
        title: this.__i18n['SERVICES.WARNING'].TITLE,
        message: customMessage,
        type: this.getMessageType(error.status),
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }*/
  }

  public handleError(error: HttpErrorResponse, mkc: MarvelServiceCredentials) {
    const { tokenStorage, router } = this;
    const { status } = error;
    const { companyType } = tokenStorage.getToken();

    const routes = {
      403: 'forbidden',
      500: 'service-problems',
      503: 'service-problems',
    };

    let route = '/app';
    if (companyType) {
      route = `${route}/${companyType}/pages`;
    } else {
      route = `${route}/user/profile/pages`;
    }

    const found = routes[status];
    let timeout = 0;

    if (found) {
      route = `${route}/${found}`.toLowerCase();
      timeout = 800;
      router.navigate([route]);
    }

    setTimeout(() => {
      this.handleMessage(error, mkc);
    }, timeout);
  }
}
