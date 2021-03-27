import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent extends BaseComponent implements OnInit {
  _config: MarvelConfig = null;

  constructor(private marvelConfigService: MarvelConfigService) {
    super();
  }

  ngOnInit() {
    this.marvelConfigService
      .config()
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((_: MarvelConfig) => {
        this._config = _;
      });
  }
}
