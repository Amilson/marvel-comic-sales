import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'app/shared/components/base/base-component';
import { takeUntil } from 'rxjs/operators';
import { MarvelModalConfig } from '../../../../../../projects/marvel-style/src/public-api';
import { SharedComicsRegisterFilterComicsModel } from '../providers/register-filter-comics.model';
import { SharedRegisterComicsModel } from '../providers/register-comics.model';
import { SharedComicsRegisterFilterComicsService } from '../providers/register-filter-comics.service';
import { SharedComicsRegisterComicsService } from '../providers/register-comics.service';
import { SharedComicsRegisterFilterSearchModel } from '../providers/register-filter-search.model';
import { SharedComicsRegisterFilterCharactersService } from '../providers/register-filter-characters.service';

@Component({
  selector: 'shared-comics-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedComicsRegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() config: MarvelModalConfig;

  @Input() modalRef: any;

  _comicModel: SharedRegisterComicsModel;

  _comics: SharedComicsRegisterFilterComicsModel[] = null;

  _isLoadingComics: boolean = false;

  _form: FormGroup;

  _conditions = ['LIKE-NEW', 'VERY-GOOD', 'GOOD', 'ACCEPTABLE', 'NEW'];

  constructor(
    private comicsService: SharedComicsRegisterFilterComicsService,
    private formBuilder: FormBuilder,
    private registerComicsService: SharedComicsRegisterComicsService,
    private registerFilterCharactersService: SharedComicsRegisterFilterCharactersService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    const { _comicModel } = this;
    const form: FormGroup = this.formBuilder.group({
      comicId: [_comicModel?.comicId, [Validators.required]],
      title: [_comicModel?.title, [Validators.required]],
      format: [_comicModel?.format],
      pageCount: [_comicModel?.pageCount],
      thumbnail_path: [_comicModel?.thumbnail_path],
      condition: [_comicModel?.condition, [Validators.required]],
      price: [_comicModel?.price, [Validators.required]],
      description: [_comicModel?.description, [Validators.required, Validators.maxLength(255)]],
      charactersAsArray: [_comicModel?.charactersAsArray],
    });

    return form;
  }

  private doComicsSeach(search?: SharedComicsRegisterFilterSearchModel) {
    const { comicsService } = this;
    comicsService.setSearch(
      new SharedComicsRegisterFilterSearchModel({
        ...search,
      })
    );
  }

  ngOnInit() {
    const { comicsService, registerFilterCharactersService } = this;

    comicsService.__onDataChanged$.pipe(takeUntil(this.__unsubscribeAll)).subscribe(() => {
      const data = comicsService.__data;
      if (data) {
        this._comics = data;
      }
    });

    comicsService.__onLoadingInProgress$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe((val: boolean) => {
        this._isLoadingComics = val;
      });

    registerFilterCharactersService.__onDataChanged$
      .pipe(takeUntil(this.__unsubscribeAll))
      .subscribe(() => {
        const data = registerFilterCharactersService.__data;
        if (this._form && data) {
          this._form.controls['charactersAsArray'].setValue(data);
        }
      });

    this._comicModel = new SharedRegisterComicsModel(this.config.data);
    this._form = this.buildForm();
  }

  ngOnDestroy() {
    super.ngOnDestroy(false);
    this.comicsService.setSearch(null);
  }

  onHandleConfirm() {
    const { _form, registerComicsService } = this;
    this.__marvelFormErrors = null;
    if (this.validateForm(_form)) {
      registerComicsService.saveData(
        new SharedRegisterComicsModel({
          ...this._comicModel,
          ..._form.value,
        })
      );
    }
  }

  onChangeComics(event: SharedComicsRegisterFilterComicsModel, type: boolean) {
    if (!type) {
      event = {
        comicId: null,
        title: '',
        format: '',
        pageCount: null,
        thumbnail_path: null,
      };
    }
    this._form.setValue({
      ...event,
      condition: '',
      price: '',
      charactersAsArray: [],
      description: '',
    });

    if (event.comicId) this.registerFilterCharactersService.setSearch(event.comicId);
  }

  onScrolledComics(event: boolean) {
    this.comicsService.__onDoPagination$.next(event);
  }

  onSearchComics(event: any) {
    this.doComicsSeach(
      new SharedComicsRegisterFilterSearchModel({
        title: event,
      })
    );
  }
}
