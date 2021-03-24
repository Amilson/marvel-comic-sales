import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MarvelServiceCredentials } from 'app/interfaces';
import { MarvelHttpErrorHandlingService } from './marvel-http-error-handling.service';
import { MarvelHandlingService } from '../marvel-handling.service';

@Injectable({
  providedIn: 'root',
})
export class MarvelErrorHandlingService implements ErrorHandler {
  constructor(
    private injector: Injector,
    private marvelHttpErrorHandlingService: MarvelHttpErrorHandlingService
  ) {
    // not to do
  }

  handleError(error: any) {
    const { injector } = this;
    const handlingService = injector.get(MarvelHandlingService);

    if (error instanceof HttpErrorResponse) {
      const sCredentials: MarvelServiceCredentials = handlingService.getMarvelServiceCredentials();
      this.marvelHttpErrorHandlingService.handleError(error, sCredentials);
    }
  }
}
