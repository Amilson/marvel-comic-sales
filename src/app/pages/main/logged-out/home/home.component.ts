import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from 'marvel-style';
import { HomeSearchModel, HomeService } from './providers';

@Component({
  selector: 'app-home-logedout',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends BaseComponent implements OnDestroy {
  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  _comics: any[];

  _isLoading: boolean = false;

  constructor(private homeService: HomeService, private router: Router) {
    super();
  }

  ngOnInit() {
    const { homeService } = this;

    super.ngOnInit({
      paginationOptions: {
        mainElement: 'container-3',
        service: homeService,
      },
    });

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
    super.ngOnDestroy(true);
  }

  onFilter(event: any) {
    this._filter = event;
    this.homeService.setSearch(new HomeSearchModel(this._filter));
  }

  onHandleFavorite(data: any) {
    this.homeService.saveFavorite(data);
  }

  onHandleMoreDetails(data: any) {
    const { router } = this;
    router.navigate(['/main/logged-out/details'], {
      state: {
        comicData: data,
      },
    });
  }

  onHandleBuy(data: any) {
    const { router } = this;
    router.navigate(['/main/logged-out/checkout'], {
      state: {
        comicData: data,
      },
    });
  }
}
