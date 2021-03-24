import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MarvelErrorHandlingService } from 'app/core/services/error';

export interface Headers {
  name: string;
  value: string;
}

@Injectable()
export class MarvelHttpConfigErrorInterceptor implements HttpInterceptor {
  constructor(private marvelErrorHandlingService: MarvelErrorHandlingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.marvelErrorHandlingService.handleError(error);
        return throwError(error);
      })
    );
  }
}
