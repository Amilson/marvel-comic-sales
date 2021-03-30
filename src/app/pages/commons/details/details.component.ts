import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarvelConfig } from 'app/interfaces';
import { SharedComicsRegisterComponent } from 'app/shared/components';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelStyleModalService } from 'marvel-style';
import { DetailsCharactersService, DetailsService } from './providers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent extends BaseComponent implements OnInit, OnDestroy {
  _loginForm: FormGroup;

  _config: MarvelConfig = null;

  _comic: any;

  _isLoading: boolean = false;

  _comicCharacters: any[];

  constructor(
    private modalService: MarvelStyleModalService,
    private detailsService: DetailsService,
    private detailsCharactersService: DetailsCharactersService
  ) {
    super();
  }

  ngOnInit() {
    const { detailsService, detailsCharactersService } = this;
    detailsService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = detailsService.__data;
      if (data) {
        this._comic = data;
        document.documentElement.style.setProperty(
          '--mc-details-image',
          `url(${data?.thumbnail_path + '.jpg'})`
        );
      }
    });

    detailsCharactersService.__onDataChanged$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe(() => {
        const data = detailsCharactersService.__data;
        if (data) {
          this._comicCharacters = data;
        }
      });

    detailsCharactersService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isLoading = val;
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
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
    this.detailsService.saveFavorite(data);
  }
}
