import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';

@Component({
  selector: 'app-home-logedout',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _loginForm: FormGroup;

  _config: MarvelConfig = null;

  constructor() {
    super();
  }

  ngOnInit() {
    //not to do
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
