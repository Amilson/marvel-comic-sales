import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from '../../../../../../projects/marvel-style/src/public-api';
import { MyComicsDeleteComponent, MyComicsRegisterComponent } from './modal';
import { MyComicsService } from './providers';

@Component({
  selector: 'app-my-comics-logedin',
  templateUrl: './my-comics.component.html',
  styleUrls: ['./my-comics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyComicsComponent extends BaseComponent implements OnInit, OnDestroy {
  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  _comics: any[];

  _isLoading: boolean = false;

  constructor(
    private modalService: MarvelStyleModalService,
    private myComicsService: MyComicsService
  ) {
    super();
  }

  ngOnInit() {
    const { myComicsService } = this;

    myComicsService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = myComicsService.__data;
      if (data) {
        this._comics = data;
      }
    });

    myComicsService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isLoading = val;
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy(true);
  }

  onFilter(event: any) {
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

  onHandleEdit(data: any) {
    const { modalService, __i18n } = this;
    modalService.open(MyComicsRegisterComponent, {
      color: 'theme',
      size: 'md',
      title: 'EDIT COMIC',
      action: {
        confirm: {
          actionColor: 'theme',
          actionType: 'primary',
          label: 'SAVE',
        },
      },
      data,
    });
  }

  onHandleRemove(data: any) {
    const { modalService, myComicsService } = this;
    modalService.open(MyComicsDeleteComponent, {
      color: 'theme',
      size: 'md',
      action: {
        confirm: {
          actionColor: 'success',
          actionType: 'primary',
          label: 'YES',
        },
        cancel: {
          actionColor: 'error',
          actionType: 'primary',
          label: 'NO',
        },
      },
      data,
    });
  }
}
