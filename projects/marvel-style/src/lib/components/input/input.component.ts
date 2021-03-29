import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  Input,
  forwardRef,
  HostListener,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarvelStyleSettings } from '../../core/interfaces';
import { MarvelStyleSettingsService } from '../../core/services';
import { MarvelUtils } from '../../core/utils';

@Component({
  selector: 'marvel-input',
  template: `
    <mc-form-field [ngClass]="{ disabled: _disabled }">
      <mc-form-field-body>
        <input
          [name]="name"
          [type]="type"
          [placeholder]="placeholder"
          (input)="onChangeValue($event)"
          (keypress)="onKeyPress($event)"
          [id]="name"
          [(ngModel)]="_formatedValue"
          [disabled]="_disabled"
          [mask]="mask"
          [prefix]="prefix"
          *ngIf="mask && prefix"
          #marvelInput
        />
        <input
          [name]="name"
          [type]="type"
          [placeholder]="placeholder"
          (input)="onChangeValue($event)"
          [id]="name"
          [(ngModel)]="_formatedValue"
          (keypress)="onKeyPress($event)"
          [disabled]="_disabled"
          [mask]="mask"
          *ngIf="mask && !prefix"
          #marvelInput
        />
        <input
          [name]="name"
          [type]="type"
          [placeholder]="placeholder"
          (input)="onChangeValue($event)"
          [id]="name"
          [(ngModel)]="_formatedValue"
          (keypress)="onKeyPress($event)"
          [disabled]="_disabled"
          [maxLength]="maxLength"
          *ngIf="!mask && !prefix"
          #marvelInput
        />
        <marvel-icon [icon]="icon" [color]="'#AAAAAA'" *ngIf="icon"></marvel-icon>
        <marvel-icon
          icon="eye-20"
          [color]="'#AAAAAA'"
          *ngIf="_oldType === 'password' && type === 'text'"
          (click)="onShowAndHidePassword()"
        ></marvel-icon>
        <marvel-icon
          icon="eye-closed-20"
          [color]="'#AAAAAA'"
          *ngIf="_oldType === 'password' && type === 'password'"
          (click)="onShowAndHidePassword()"
        ></marvel-icon>
      </mc-form-field-body>
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
      useExisting: forwardRef(() => MarvelInputComponent),
      multi: true,
    },
    CurrencyPipe,
  ],
})
export class MarvelInputComponent implements ControlValueAccessor, OnInit {
  @Input() name: string = `marvel-input-${MarvelUtils.getRandomString(10)}`;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() infoMessage: string;
  @Input() errorMessage: string;
  @Input() mask: string;
  @Input() prefix: string;
  @Input() maxLength: number = 255;
  @Input() onlyNumber: any;
  @Input() onlyAlphaNumeric: any;
  @Input() upperCase: any;
  @Input() lowerCase: any;
  @Input() capitalize: any;
  @Input() currency: any;
  @Output() onChange = new EventEmitter<any>();

  private settings: MarvelStyleSettings;
  private handledValue: any;
  private onModelChange = (value: any) => {};
  private onModelTouched = (value: any) => {};
  private timer: any;

  public _id: string = `marvel-input-${MarvelUtils.getRandomString(10)}`;
  public _disabled: boolean = false;
  public _oldType: string;
  public _formatedValue: any;

  @ViewChild('marvelInput', {
    static: true,
  })
  marvelInput: ElementRef;

  constructor(
    private currencyPipe: CurrencyPipe,
    private settingsService: MarvelStyleSettingsService,
    private cdr: ChangeDetectorRef
  ) {}

  private handleValue(value: any, apply = false): any {
    if (this.onlyNumber !== undefined) return MarvelUtils.handleOnlyNumbers(`${value}`);
    else if (this.upperCase !== undefined) return `${value}`.toUpperCase();
    else if (this.lowerCase !== undefined) return `${value}`.toLowerCase();
    else if (this.capitalize !== undefined) return MarvelUtils.capitalize(`${value}`.toUpperCase());
    else if (this.currency !== undefined) {
      return MarvelUtils.handleOnlyNumbers(`${value}`) / (apply ? 100 : 1);
    }

    return value;
  }

  private formatValue(value: any): any {
    const { settings } = this;
    if (this.currency !== undefined) {
      return this.currencyPipe.transform(
        `${value}`,
        settings?.currency?.code || 'BRL',
        'symbol',
        '',
        settings?.currency?.locale || 'pt-BR'
      );
    }

    return value;
  }

  private onHandleValueChanged(value: any) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.onChange.next(value);
    }, 400);
  }

  ngOnInit() {
    const { settingsService } = this;
    this._oldType = this.type;
    settingsService.settings().subscribe((val: MarvelStyleSettings) => {
      this.settings = val;
    });
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
    if (value !== undefined) {
      this.handledValue = value;
      this._formatedValue = this.formatValue(value);
      this.cdr.detectChanges();
      this.onModelChange(this.handledValue);
      this.onModelTouched(this.handledValue);
    }
  }

  get value(): any {
    return this.handledValue;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onChangeValue(event: any) {
    const { value } = event?.target;
    event?.preventDefault();
    event?.stopPropagation();
    const handled = this.handleValue(value, true);
    this.writeValue(handled);
    this.onHandleValueChanged(handled);
  }

  onShowAndHidePassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  @HostListener('click')
  onClick() {
    this.marvelInput?.nativeElement?.focus();
  }

  onKeyPress(event: any) {
    let pattern = null;
    const inputChar = String.fromCharCode(event.charCode);
    if (this.currency !== undefined || this.onlyNumber !== undefined) {
      pattern = /[0-9]/;
    } else if (this.onlyAlphaNumeric) {
      pattern = /[^0-9A-Za-z]/;
    }

    if (pattern && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
