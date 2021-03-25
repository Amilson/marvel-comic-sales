import { Injectable } from '@angular/core';
import { MarvelStyleService } from '../marvel-style.service';
import { MarvelStyleSettings } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { MarvelStyleThemeSettingsService } from './marvel-style-theme-settings.service';

@Injectable()
export class MarvelStyleSettingsService {
  private readonly settingsSubject$: BehaviorSubject<MarvelStyleSettings> = new BehaviorSubject({});

  constructor(
    private marvelSService: MarvelStyleService,
    private marvelSThemeConfigService: MarvelStyleThemeSettingsService
  ) {}

  public boostrap(settingsUrl: string, callback?: Function) {
    const { marvelSService, settingsSubject$, marvelSThemeConfigService } = this;

    marvelSService.get<any>(settingsUrl || `assets/marvel-style-settings.json`).subscribe(
      (_: MarvelStyleSettings) => {
        marvelSThemeConfigService.apply(_, callback);
        settingsSubject$.next(_);
      },
      (err: HttpErrorResponse) => {
        console.error('marvel-style-settings not found!');
        throwError(err);
      }
    );
  }

  public settings(): Observable<any> {
    return this.settingsSubject$.asObservable();
  }
}
