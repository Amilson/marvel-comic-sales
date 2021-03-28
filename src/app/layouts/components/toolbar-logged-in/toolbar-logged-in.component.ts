import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelAuthService } from 'app/core/services/auth';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { MarvelAuthUser, MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-logged-in',
  templateUrl: './toolbar-logged-in.component.html',
  styleUrls: ['./toolbar-logged-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarLoggedInComponent extends BaseComponent implements OnInit {
  _config: MarvelConfig = null;

  _me: MarvelAuthUser;

  constructor(
    public _router: Router,
    private marvelConfigService: MarvelConfigService,
    private authService: MarvelAuthService
  ) {
    super();
  }

  ngOnInit() {
    const { marvelConfigService, authService } = this;
    marvelConfigService
      .config()
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((_: MarvelConfig) => {
        this._config = _;
      });

    authService.user$.pipe(takeUntil(this.__unsubscribeAll)).subscribe((_: MarvelAuthUser) => {
      this._me = _;
    });
  }

  onSignOut() {
    this.authService.signOut();
  }
}
