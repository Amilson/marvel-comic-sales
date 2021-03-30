import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { CheckoutSuccessService } from './providers';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutSuccessComponent extends BaseComponent implements OnInit, OnDestroy {
  _config: MarvelConfig = null;

  _comic: any;

  _isLoading: boolean = false;

  _comicCharacters: any[];

  constructor(private checkoutsuccessService: CheckoutSuccessService) {
    super();
  }

  ngOnInit() {
    const { checkoutsuccessService } = this;
    checkoutsuccessService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = checkoutsuccessService.__data;
      if (data) {
        this._comic = data;
        document.documentElement.style.setProperty(
          '--mc-checkout-image',
          `url(${data?.thumbnail_path + '.jpg'})`
        );
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
