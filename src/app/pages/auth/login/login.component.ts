import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { AuthCredentials, MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from './login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _loginForm: FormGroup;

  _config: MarvelConfig = null;

  private loginData: AuthCredentials;

  constructor(
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private marvelConfigService: MarvelConfigService,
    private loginService: LoginService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    const { loginData } = this;

    return this.formBuilder.group({
      username: [
        {
          value: loginData?.username,
          disabled: true,
        },
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const { loginService, marvelConfigService } = this;
    marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this._config = _;
    });

    loginService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = loginService.__data;
      if (data) {
        this.loginData = {
          ...data,
        };
      }
      this._loginForm = this.buildForm();
    });

    loginService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isSubmitting = val;
        this._loginForm?.enable();
        if (val) this._loginForm?.disable();
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    const { _config, _loginForm, loginService } = this;

    if (this.validateForm(_loginForm)) {
      this.__marvelFormErrors = null;

      const params: AuthCredentials = {
        ..._loginForm.value,
      };

      _loginForm.disable();
      loginService.login(params, _config);
    }
  }

  login() {
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.auth.createUserWithEmailAndPassword('amilson@teste.cc', '123456').then((resp) => {
      console.log(resp);
    });
  }

  logout() {
    this.auth.signOut();
  }
}
