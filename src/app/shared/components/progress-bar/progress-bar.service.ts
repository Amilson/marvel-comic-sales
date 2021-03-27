import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedProgressBarService extends MarvelCommonsService {
  private visible: BehaviorSubject<boolean>;

  constructor(private _router: Router) {
    super();
    this.init();
    this.__onLoadingInProgress$.subscribe((val: boolean) => {
      if (!this.visible) {
        if (val) this.show();
        else this.hide();
      }
    });
  }

  private init() {
    this.visible = new BehaviorSubject(false);

    this._router.events
      .pipe(
        filter((event: any) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe(() => {
        this.show();
      });

    this._router.events
      .pipe(
        filter((event: any) => {
          return (
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel
          );
        })
      )
      .subscribe(() => {
        this.hide();
      });
  }

  show() {
    this.visible.next(true);
  }

  hide() {
    this.visible.next(false);
  }

  visibleConfig(): Observable<any> {
    return this.visible.asObservable();
  }
}
