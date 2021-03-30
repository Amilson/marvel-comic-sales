import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarvelHandlingService } from './marvel-handling.service';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  constructor(protected http: HttpClient, public handlingService: MarvelHandlingService) {
    // not to do
  }

  public get<T>(url: string, options?: T): Observable<T> {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, params: T, options?: T): Observable<T> {
    return this.http.post<T>(url, params, options);
  }

  public put<T>(url: string, params: T): Observable<T> {
    return this.http.put<T>(url, params);
  }

  public delete<T>(url: string, params?: T): Observable<T> {
    return this.http.delete<T>(url, params);
  }
}
