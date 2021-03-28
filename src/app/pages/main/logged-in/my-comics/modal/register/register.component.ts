import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'app/shared/components';
import { takeUntil } from 'rxjs/operators';
import { MarvelModalConfig } from '../../../../../../../../projects/marvel-style/src/public-api';
import {
  MyComicsRegisterFilterSearchModel,
  MyComicsRegisterFilterComicsService,
  MyComicsRegisterFilterComicsModel,
  MyComicsRegisterComicsService,
  RegisterComicsModel,
} from '../../providers';

@Component({
  selector: 'app-my-comics-logedin-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyComicsRegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() config: MarvelModalConfig;

  @Input() modalRef: any;

  _comics: MyComicsRegisterFilterComicsModel[] = null;

  _isLoadingComics: boolean = false;

  _form: FormGroup;

  _conditions = ['LIKE_NEW', 'VERY_GOOD', 'GOOD', 'ACCEPTABLE', 'NEW'];

  constructor(
    private comicsService: MyComicsRegisterFilterComicsService,
    private formBuilder: FormBuilder,
    private registerComicsService: MyComicsRegisterComicsService
  ) {
    super();
  }

  private buildForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      format: [''],
      pageCount: [''],
      thumbnail: [''],
      condition: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });

    return form;
  }

  private doComicsSeach(search?: MyComicsRegisterFilterSearchModel) {
    const { comicsService } = this;
    comicsService.setSearch(
      new MyComicsRegisterFilterSearchModel({
        ...search,
      })
    );
  }

  ngOnInit() {
    const { comicsService } = this;

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

    this._form = this.buildForm();
  }

  ngOnDestroy() {
    this.comicsService.setSearch(null);
  }

  onHandleConfirm() {
    const { _form, registerComicsService } = this;
    this.__marvelFormErrors = null;
    if (this.validateForm(_form)) {
      console.log('_form');
      console.log(_form);
      registerComicsService.saveData(new RegisterComicsModel(_form.value));
    }
    console.log(this.__marvelFormErrors);
  }

  onChangeComics(event: MyComicsRegisterFilterComicsModel, type: boolean) {
    if (!type) {
      event = {
        id: null,
        title: '',
        format: '',
        pageCount: null,
        thumbnail: null,
      };
    }
    this._form.setValue({
      ...event,
      condition: '',
      price: '',
      description: '',
    });
  }

  onScrolledComics(event: boolean) {
    this.comicsService.__onDoPagination$.next(event);
  }

  onSearchComics(event: any) {
    this.doComicsSeach(
      new MyComicsRegisterFilterSearchModel({
        title: event,
      })
    );
  }
}
