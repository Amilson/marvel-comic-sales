import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MarvelConfigService } from 'app/core/services/config/marvel-config.service';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import {
  SharedFilterCharactersModel,
  SharedFilterCharactersService,
  SharedFilterModel,
  SharedFilterSearchModel,
} from './providers';

@Component({
  selector: 'shared-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedFilterComponent extends BaseComponent implements OnInit {
  @Output() onFilter = new EventEmitter<any>();

  _config: MarvelConfig = null;

  _filter: SharedFilterModel;

  _filterSearch: SharedFilterSearchModel;

  _characters: SharedFilterCharactersModel[] = null;

  _isLoadingCharacters: boolean = false;

  _sizes = [15, 30, 50];

  _orders = ['ALPHABETICAL', 'MOST-RECENT', 'PRICE-LOW-TO-HIGH', 'PRICE-HIGH-TO-LOW'];

  constructor(
    private marvelConfigService: MarvelConfigService,
    private charactersService: SharedFilterCharactersService
  ) {
    super();
  }

  private onHandleFilter() {
    this.onFilter.next(this._filter);
  }

  private doCharactersSeach(search?: SharedFilterSearchModel) {
    const { charactersService } = this;
    charactersService.setSearch(
      (this._filterSearch = new SharedFilterSearchModel({
        ...this._filterSearch,
        ...search,
      }))
    );
  }

  ngOnInit() {
    const { charactersService, marvelConfigService } = this;

    marvelConfigService.config().subscribe((_: MarvelConfig) => {
      this._config = _;
    });

    charactersService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = charactersService.__data;
      if (data) {
        this._characters = data;
      }
    });

    charactersService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isLoadingCharacters = val;
      });

    this._filter = new SharedFilterModel();
  }

  onChangeSearchFor(event: any) {
    this._filter = new SharedFilterModel({
      ...this._filter,
      name: event,
    });
    this.onHandleFilter();
  }

  onChangeCharacters(event: any, type: boolean) {
    this._filter.handleCharacters(event, type);
    this.onHandleFilter();
  }

  onScrolledCharacters(event: boolean) {
    this.charactersService.__onDoPagination$.next(event);
  }

  onSearchCharacters(event: any) {
    this.doCharactersSeach(
      new SharedFilterSearchModel({
        characterName: event,
      })
    );
  }

  onChangeOrder(order: string) {
    this._filter = new SharedFilterModel({
      ...this._filter,
      order,
    });
    this.onHandleFilter();
  }

  onChangeSize(limit: number) {
    this._filter = new SharedFilterModel({
      ...this._filter,
      limit,
    });
    this.onHandleFilter();
  }
}
