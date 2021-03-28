import {
  Component,
  ViewEncapsulation,
  Input,
  forwardRef,
  Output,
  HostListener,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarvelUtils } from '../../core/utils';

@Component({
  selector: 'marvel-option',
  template: `
    <span
      class="mc-option"
      [ngClass]="{ selected: value === selected?.value }"
      [id]="_id"
      *ngIf="type === 'select'"
    >
      {{ label }}
    </span>
    <div
      class="mc-option-custom"
      [ngClass]="{ selected: value === selected?.value }"
      [id]="_id"
      *ngIf="type === 'custom'"
    >
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarvelOptionComponent),
      multi: true,
    },
  ],
})
export class MarvelOptionComponent {
  @Input() type: string = 'select';
  @Input() label: string;
  @Input() value: any;
  @Input() selected: MarvelOptionComponent;
  @Output() onSelectOption: Function;

  public _id: string = `mc-option-${MarvelUtils.getRandomString(10)}`;

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.onSelectOption(this);
  }
}
