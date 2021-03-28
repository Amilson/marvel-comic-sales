import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { MarvelStyleModalService } from '../../../../../../projects/marvel-style/src/public-api';
import { MyComicsRegisterComponent } from './modal';

@Component({
  selector: 'app-my-comics-logedin',
  templateUrl: './my-comics.component.html',
  styleUrls: ['./my-comics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyComicsComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _loginForm: FormGroup;

  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  constructor(private modalService: MarvelStyleModalService) {
    super();
  }

  ngOnInit() {
    //not to do
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onFilter(event: any) {
    console.log(event);
    this._filter = event;
  }

  onHandleAdd() {
    const { modalService, __i18n } = this;
    modalService.open(MyComicsRegisterComponent, {
      color: 'theme',
      size: 'md',
      title: '+ ADD COMIC',
      action: {
        confirm: {
          actionColor: 'theme',
          actionType: 'primary',
          label: '+ ADD COMIC',
        },
      },
    });
  }
}
