import { Component, ViewEncapsulation, OnInit, Input, OnChanges } from '@angular/core';
import { MarvelStyleSettingsService } from '../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarvelUtils } from '../../core/utils';

@Component({
  selector: 'marvel-icon',
  template: `
    <marvel-icon-arrow-left
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'arrow-left'"
    >
    </marvel-icon-arrow-left>
    <marvel-icon-eye-closed
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'eye-closed'"
    >
    </marvel-icon-eye-closed>
    <marvel-icon-eye [fillColor]="_fillColor" [id]="_id" [size]="_size" *ngIf="_icon === 'eye'">
    </marvel-icon-eye>
    <marvel-icon-facebook
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'facebook'"
    >
    </marvel-icon-facebook>
    <marvel-icon-facebook-round
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'facebook-round'"
    >
    </marvel-icon-facebook-round>
    <marvel-icon-google
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'google'"
    >
    </marvel-icon-google>
    <marvel-icon-heart [fillColor]="_fillColor" [id]="_id" [size]="_size" *ngIf="_icon === 'heart'">
    </marvel-icon-heart>
    <marvel-icon-instagram-round
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'instagram-round'"
    >
    </marvel-icon-instagram-round>
    <marvel-icon-mail [fillColor]="_fillColor" [id]="_id" [size]="_size" *ngIf="_icon === 'mail'">
    </marvel-icon-mail>
    <marvel-icon-search
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'search'"
    >
    </marvel-icon-search>
    <marvel-icon-twitter-round
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'twitter-round'"
    >
    </marvel-icon-twitter-round>
    <marvel-icon-user [fillColor]="_fillColor" [id]="_id" [size]="_size" *ngIf="_icon === 'user'">
    </marvel-icon-user>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelIconComponent implements OnInit, OnChanges {
  @Input() icon: string;

  @Input() color: string = 'theme';

  @Input() contrast = false;

  _fillColor = '#000000';

  _icon = '';

  _id = `mecx-icon-${MarvelUtils.getRandomString(10)}`;

  _size: string;

  private unsubscribeAll: Subject<any>;

  constructor(private styleSettingsService: MarvelStyleSettingsService) {
    this.unsubscribeAll = new Subject();
  }

  private handleIcon() {
    const { icon, color, contrast, styleSettingsService } = this;
    const handledIcon = icon?.substr(0, icon?.lastIndexOf('-'));
    this._icon = handledIcon;
    this._size = icon?.substr(icon?.lastIndexOf('-') + 1, icon?.length);

    styleSettingsService
      .settings()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings: any) => {
        if (settings && JSON.stringify(settings) !== '{}') {
          const { colors } = settings;

          let handledColor = '';
          if ((color || '').search('#') < 0) {
            let handledMainColor = '',
              handledSecondColor = '';
            handledMainColor = color.split('-')[0];
            if (!handledMainColor) handledMainColor = 'theme';
            handledSecondColor = color.split('-')[1];
            if (!handledSecondColor) handledSecondColor = '500';

            handledColor = colors[handledMainColor][handledSecondColor];
            if (contrast) {
              handledColor = colors[handledMainColor]['contrast'][handledSecondColor];
            }
          } else {
            handledColor = color;
          }

          this._fillColor = handledColor;
        }
      });
  }

  ngOnInit() {
    this.handleIcon();
  }

  ngOnChanges() {
    this.handleIcon();
  }
}
