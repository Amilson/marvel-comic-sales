import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MarvelConfigService } from 'app/core/services/config';
import { MarvelConfig } from 'app/interfaces';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base';

@Component({
  selector: 'shared-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedSocialMediaComponent extends BaseComponent implements OnInit {
  _config: MarvelConfig = null;
  constructor(private marvelConfigService: MarvelConfigService) {
    super();
  }

  ngOnInit() {
    const { marvelConfigService } = this;
    marvelConfigService
      .config()
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((_: MarvelConfig) => {
        this._config = _;
      });
  }
}
