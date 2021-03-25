import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MarvelStyleService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string, options?: T): Observable<T> {
    return this.http.get<T>(url, options);
  }
}
