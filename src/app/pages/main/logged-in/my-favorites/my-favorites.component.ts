import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelConfig } from 'app/interfaces';
import { SharedFilterModel } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from '../../../../../../projects/marvel-style/src/public-api';
import { SharedComicsDeleteComponent, SharedComicsRegisterComponent } from 'app/shared/components';
import { MyFavoritesService } from './providers';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-favorites-logedin',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyFavoritesComponent extends BaseComponent implements OnInit, OnDestroy {
  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  _comics: any[];

  _isLoading: boolean = false;

  constructor(
    private modalService: MarvelStyleModalService,
    private myFavoritesService: MyFavoritesService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const { myFavoritesService } = this;

    myFavoritesService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = myFavoritesService.__data;
      if (data) {
        this._comics = data;
      }
    });

    myFavoritesService.__onLoadingInProgress$
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
    modalService.open(SharedComicsRegisterComponent, {
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

  onHandleRemove(data: any) {
    const { modalService } = this;
    modalService.open(SharedComicsDeleteComponent, {
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

  onHandleMoreDetails(data: any) {
    const { router } = this;
    router.navigate(['/main/logged-in/details'], {
      state: {
        comicData: data,
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(this._comics, previousIndex, currentIndex);
    const data = this._comics[previousIndex];
    this.myFavoritesService.sortFavorite({
      ...data,
      currentIndex,
    });
  }
}
