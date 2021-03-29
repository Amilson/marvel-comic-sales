import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarvelConfig } from 'app/interfaces';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { DetailsCharactersService, DetailsService } from './providers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent extends BaseComponent implements OnInit, OnDestroy {
  _isSubmitting: boolean = false;

  _loginForm: FormGroup;

  _config: MarvelConfig = null;

  _comic: any;

  _comicCharacters: any[];

  constructor(
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
        console.log('====');
        console.log(this._comic);
        console.log('====');

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
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
