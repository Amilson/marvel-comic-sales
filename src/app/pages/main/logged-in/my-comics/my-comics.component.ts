import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from 'marvel-style';
import { SharedComicsDeleteComponent, SharedComicsRegisterComponent } from 'app/shared/components';
import { MyComicsSearchModel, MyComicsService } from './providers';

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
    private myComicsService: MyComicsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const { myComicsService } = this;

    super.ngOnInit({
      paginationOptions: {
        mainElement: 'container-3',
        service: myComicsService,
      },
      translateOptions: {
        service: myComicsService,
      },
    });

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
    this.myComicsService.setSearch(new MyComicsSearchModel(this._filter));
  }

  onHandleAdd() {
    const { modalService, __i18n } = this;
    modalService.open(SharedComicsRegisterComponent, {
      color: 'theme',
      size: 'md',
      title: `+ ${__i18n?.TITLES['ADD-COMIC']}`,
      action: {
        confirm: {
          actionColor: 'theme',
          actionType: 'primary',
          label: `+ ${__i18n?.BUTTONS['ADD-COMIC']}`,
        },
      },
    });
  }

  onHandleEdit(data: any) {
    const { modalService, __i18n } = this;
    modalService.open(SharedComicsRegisterComponent, {
      color: 'theme',
      size: 'md',
      title: `${__i18n?.TITLES['EDIT-COMIC']}`,
      action: {
        confirm: {
          actionColor: 'theme',
          actionType: 'primary',
          label: `${__i18n?.BUTTONS.SAVE}`,
        },
      },
      data,
    });
  }

  onHandleRemove(data: any) {
    const { modalService, __i18n } = this;
    modalService.open(SharedComicsDeleteComponent, {
      color: 'theme',
      size: 'md',
      action: {
        confirm: {
          actionColor: 'success',
          actionType: 'primary',
          label: __i18n?.BUTTONS.YES,
        },
        cancel: {
          actionColor: 'error',
          actionType: 'primary',
          label: __i18n?.BUTTONS.NO,
        },
      },
      data,
    });
  }

  onHandleMoreDetails(data: any) {
    const { router } = this;
    router.navigate(['/main/logged-in/details'], {
      state: {
        comicData: data,
      },
    });
  }
}
