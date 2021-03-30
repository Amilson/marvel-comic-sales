import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from 'marvel-style';
import { MyOrdersSearchModel, MyOrdersService } from './providers';

@Component({
  selector: 'app-my-orders-logedin',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyOrdersComponent extends BaseComponent implements OnInit, OnDestroy {
  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  _comics: any[];

  _isLoading: boolean = false;

  constructor(
    private modalService: MarvelStyleModalService,
    private MyOrdersService: MyOrdersService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const { MyOrdersService } = this;

    super.ngOnInit({
      paginationOptions: {
        mainElement: 'container-3',
        service: MyOrdersService,
      },
      translateOptions: {
        service: MyOrdersService,
      },
    });

    MyOrdersService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = MyOrdersService.__data;
      if (data) {
        this._comics = data;
      }
    });

    MyOrdersService.__onLoadingInProgress$
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
    this.MyOrdersService.setSearch(new MyOrdersSearchModel(this._filter));
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
