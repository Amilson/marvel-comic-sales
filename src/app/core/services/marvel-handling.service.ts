import { Injectable } from '@angular/core';
import { MarvelServiceCredentials } from 'app/interfaces';

@Injectable({
  providedIn: 'root',
})
export abstract class MarvelHandlingService {
  private serviceCredentials: MarvelServiceCredentials;

  public clearAll() {
    this.serviceCredentials = null;
  }

  public setMarvelServiceCredentials(param: MarvelServiceCredentials) {
    this.serviceCredentials = param;
  }

  public getMarvelServiceCredentials(): MarvelServiceCredentials {
    return this.serviceCredentials;
  }
}
