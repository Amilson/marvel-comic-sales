import { Component, ViewEncapsulation, OnInit, Input, OnChanges } from '@angular/core';
import { MarvelStyleSettingsService } from '../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarvelUtils } from '../../core/utils';

@Component({
  selector: 'marvel-icon',
  template: `
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
    <marvel-icon-google
      [fillColor]="_fillColor"
      [id]="_id"
      [size]="_size"
      *ngIf="_icon === 'google'"
    >
    </marvel-icon-google>
    <marvel-icon-mail [fillColor]="_fillColor" [id]="_id" [size]="_size" *ngIf="_icon === 'mail'">
    </marvel-icon-mail>
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
