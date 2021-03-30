import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutCredentials, MarvelConfig } from 'app/interfaces';
import { SharedComicsRegisterComponent } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from 'marvel-style';
import { CheckoutCharactersService, CheckoutService } from './providers';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent extends BaseComponent implements OnInit, OnDestroy {
  _checkoutForm: FormGroup;

  _config: MarvelConfig = null;

  _comic: any;

  _isLoading: boolean = false;

  _comicCharacters: any[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: MarvelStyleModalService,
    private checkoutService: CheckoutService,
    private checkoutCharactersService: CheckoutCharactersService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      creditCardNumber: ['', [Validators.required]],
      creditCardValidate: ['', [Validators.required]],
      creditCardSecret: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const { checkoutService, checkoutCharactersService } = this;
    checkoutService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = checkoutService.__data;
      if (data) {
        this._comic = data;
        document.documentElement.style.setProperty(
          '--mc-checkout-image',
          `url(${data?.thumbnail_path + '.jpg'})`
        );
      }
    });

    checkoutCharactersService.__onDataChanged$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe(() => {
        const data = checkoutCharactersService.__data;
        if (data) {
          this._comicCharacters = data;
        }
      });

    checkoutCharactersService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isLoading = val;
      });

    this._checkoutForm = this.buildForm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    const { _checkoutForm, checkoutService, _comic } = this;

    if (this.validateForm(_checkoutForm)) {
      this.__marvelFormErrors = null;

      const params: CheckoutCredentials = {
        ..._checkoutForm.value,
      };

      checkoutService.buy({
        ...params,
        ..._comic,
      });
    }
  }

  onHandleFavorite(data: any) {
    this.checkoutService.saveFavorite(data);
  }
}
