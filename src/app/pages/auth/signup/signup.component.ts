import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { ValidateUtils } from 'app/core/utils';
import { MarvelConfig, SignupCredentials } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _signupForm: FormGroup;

  _config: MarvelConfig = null;

  constructor(
    private formBuilder: FormBuilder,
    private marvelConfigService: MarvelConfigService,
    private signupService: SignupService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      passwordConfirm: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          ValidateUtils.PasswordMatchValidation.do,
        ],
      ],
    });
  }

  ngOnInit() {
    const { signupService, marvelConfigService } = this;
    marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this._config = _;
    });

    this._signupForm = this.buildForm();

    signupService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isSubmitting = val;
        this._signupForm?.enable();
        if (val) this._signupForm?.disable();
      });

    signupService.__onErrorChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const error = signupService.__error;
      if (error) {
        this.__marvelFormErrors = {
          ...this.__marvelFormErrors,
          ...error,
        };
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    const { _signupForm, signupService } = this;

    if (this.validateForm(_signupForm)) {
      this.__marvelFormErrors = null;

      const params: SignupCredentials = {
        ..._signupForm.value,
      };

      signupService.signup(params);
    }
  }

  onHandleGoogleSignup() {
    this.signupService.googleSignup();
  }

  onHandleFacebookSignup() {
    this.signupService.facebookSignup();
  }
}
