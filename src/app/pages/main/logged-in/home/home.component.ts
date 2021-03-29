import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from '../../../../../../projects/marvel-style/src/public-api';
import { SharedComicsRegisterComponent } from 'app/shared/components';
import { HomeService } from './providers';

@Component({
  selector: 'app-home-logedin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  _comics: any[];

  _isLoading: boolean = false;

  constructor(
    private modalService: MarvelStyleModalService,
    private homeService: HomeService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const { homeService } = this;

    homeService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = homeService.__data;
      if (data) {
        this._comics = data;
      }
    });

    homeService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isLoading = val;
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onFilter(event: any) {
    this._filter = event;
  }

  onHandleEdit(data: any) {
    const { modalService } = this;
    modalService.open(SharedComicsRegisterComponent, {
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

  onHandleFavorite(data: any) {
    console.log(data);
    this.homeService.saveFavorite(data);
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
