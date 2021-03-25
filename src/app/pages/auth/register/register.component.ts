import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { AuthCredentials, MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _registerForm: FormGroup;

  _config: MarvelConfig = null;

  private registerData: AuthCredentials;

  constructor(
    private formBuilder: FormBuilder,
    private marvelConfigService: MarvelConfigService,
    private registerService: RegisterService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    const { registerData } = this;

    return this.formBuilder.group({
      username: [
        {
          value: registerData?.username,
          disabled: true,
        },
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const { registerService, marvelConfigService } = this;
    marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this._config = _;
    });

    registerService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = registerService.__data;
      if (data) {
        this.registerData = {
          ...data,
        };
      }
      this._registerForm = this.buildForm();
    });

    registerService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isSubmitting = val;
        this._registerForm?.enable();
        if (val) this._registerForm?.disable();
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    const { _config, _registerForm, registerService } = this;

    if (this.validateForm(_registerForm)) {
      this.__marvelFormErrors = null;

      const params: AuthCredentials = {
        ..._registerForm.value,
      };

      _registerForm.disable();
      registerService.register(params, _config);
    }
    console.log(this.__marvelFormErrors);
  }
}
