import {
  Component,
  ViewEncapsulation,
  Input,
  forwardRef,
  HostListener,
  QueryList,
  ContentChildren,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarvelOptionComponent } from '../option';
import { MarvelUtils } from '../../core/utils';

@Component({
  selector: 'marvel-select-search',
  template: `
    <mc-form-field [id]="_id" [ngClass]="{ disabled: _disabled }">
      <mc-form-field-header>
        <label>
          {{ label }}
        </label>
        <helper>
          {{ helperMessage }}
        </helper>
      </mc-form-field-header>
      <mc-form-field-body (click)="open($event)">
        <marvel-icon [icon]="icon" [color]="'#aaaaaa'"></marvel-icon>

        <mc-select class="trigger" [ngClass]="{ open: _opened }">
          <mc-select__trigger>
            <marvel-input
              name="filter-search"
              [placeholder]="placeholder"
              (onChange)="onChangeInput($event)"
            >
            </marvel-input>
            <marvel-icon icon="arrow-down-24" [color]="'#aaaaaa'"></marvel-icon>
          </mc-select__trigger>
        </mc-select>
      </mc-form-field-body>
      <mc-select-inside [ngClass]="{ open: _opened }">
        <mc-select-options #selectOptions (scroll)="onScroll($event)">
          <ng-content> </ng-content>
          <marvel-progress *ngIf="showProgress"></marvel-progress>
        </mc-select-options>
      </mc-select-inside>
      <mc-form-field-footer>
        <info>
          {{ infoMessage }}
        </info>
        <error>
          {{ errorMessage }}
        </error>
      </mc-form-field-footer>
    </mc-form-field>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarvelSelectSearchComponent),
      multi: true,
    },
  ],
})
export class MarvelSelectSearchComponent implements AfterViewInit, OnChanges, ControlValueAccessor {
  @Input() label: string;
  @Input() helperMessage: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() infoMessage: string;
  @Input() errorMessage: string;
  @Input() fieldToCompare: string;
  @Input() showProgress: boolean = false;
  @Output() onChange = new EventEmitter<any>();
  @Output() onScrolled = new EventEmitter<boolean>(false);
  @Output() onSearch = new EventEmitter<any>(null);

  @ViewChild('selectOptions', { static: true })
  selectOptions: ElementRef;

  private handledValue: any;
  private onModelChange = (value: any) => {};
  private onModelTouched = (value: any) => {};
  @ContentChildren(MarvelOptionComponent)
  private options!: QueryList<MarvelOptionComponent>;
  private timer: any;

  public _selected: MarvelOptionComponent;
  public _opened: boolean = false;
  public _id: string = `mc-select-search-${MarvelUtils.getRandomString(10)}`;
  public _disabled: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  private onHandleSelected() {
    const { _opened, _selected } = this;
    this.options.forEach((op) => {
      op.selected = _selected;
    });
    if (_opened) {
      let scrollValue = 0;
      if (_selected) {
        const { _id } = this._selected;
        scrollValue = document.getElementById(_id).offsetTop - 10;
      }
      this.selectOptions.nativeElement.scrollTo(0, scrollValue);
      this.selectOptions.nativeElement.focus();
      this.cdRef.detectChanges();
    }
  }

  private validateOptions() {
    const { fieldToCompare } = this;
    if (!this.options) return;
    this.options.forEach((op) => {
      op.onSelectOption = this.onSelectOption.bind(this);
      op.type = op?.type || 'select';
      op.selected = null;
      let source = '';
      let destination = '';
      if (fieldToCompare) {
        source = `${op.value[fieldToCompare]}`.toLowerCase();
        destination = `${this.handledValue?.[fieldToCompare]}`.toLowerCase();
      } else {
        source = `${op.value}`.toLowerCase();
        destination = `${this.handledValue}`.toLowerCase();
      }
      if (source === destination) {
        this._selected = op;
        op.selected = op;
      }
    });
  }

  private doSearch(search: string) {
    this.onSearch.next(search);
    this._opened = true;
    this.onHandleSelected();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  @Input()
  set value(value: any) {
    if (value !== undefined && this.handledValue !== value) {
      this.handledValue = value;
      this.onModelChange(value);
      this.onModelTouched(value);
    }
    this.validateOptions();
  }

  get value(): any {
    return this.handledValue;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onChangeValue(event: any, value: any) {
    event?.preventDefault();
    event?.stopPropagation();
    this.writeValue(value);
    this.onChange.next(value);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    this._opened = false;
  }

  open(event: any) {
    event?.preventDefault();
    event?.stopPropagation();
    this._opened = !this._opened;
    this.onHandleSelected();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.validateOptions();
    }, 0);
  }

  ngOnChanges() {
    setTimeout(() => {
      this.validateOptions();
    }, 0);
  }

  onSelectOption(select: MarvelOptionComponent) {
    this._selected = select;
    const { value } = select;
    this._opened = false;
    this.onChangeValue(null, value);
    this.onHandleSelected();
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.onScrolled.next(true);
    }
  }

  onChangeInput(event: any) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.doSearch(event);
    }, 400);
  }
}
