import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { MarvelConfig, SigninCredentials } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { SigninService } from './signin.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _signinForm: FormGroup;

  _config: MarvelConfig = null;

  private signinData: SigninCredentials;

  constructor(
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private marvelConfigService: MarvelConfigService,
    private signinService: SigninService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    const { signinData } = this;

    return this.formBuilder.group({
      email: [
        {
          value: signinData?.email,
          disabled: true,
        },
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const { signinService, marvelConfigService } = this;
    marvelConfigService
      .config()
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((_: MarvelConfig) => {
        this._config = _;
      });

    signinService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = signinService.__data;
      if (data) {
        this.signinData = {
          ...data,
        };
      }
      this._signinForm = this.buildForm();
    });

    signinService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isSubmitting = val;
        this._signinForm?.enable();
        if (val) this._signinForm?.disable();
      });

    signinService.__onErrorChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const error = signinService.__error;
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
    const { _signinForm, signinService } = this;

    if (this.validateForm(_signinForm)) {
      this.__marvelFormErrors = null;

      const params: SigninCredentials = {
        ..._signinForm.value,
      };

      signinService.signin(params);
    }
  }

  onGoogleSignin() {
    this.signinService.googleSignin();
  }

  signin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    /*this.auth.createUserWithEmailAndPassword('amilson@teste.cc', '123456').then((resp) => {
      console.log(resp);
    });*/
  }

  logout() {
    this.auth.signOut();
  }
}
