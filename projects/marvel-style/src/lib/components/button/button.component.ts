import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
  selector: 'marvel-button',
  template: `
    <button
      [ngClass]="
        'mc-button-' +
        type +
        ' mc-button-' +
        type +
        '__' +
        color +
        (icon ? ' with-icon' : ' no-icon')
      "
      type="button"
      [disabled]="disabled"
    >
      <marvel-icon
        [icon]="icon"
        [color]="'theme'"
        [contrast]="_useContrast"
        *ngIf="iconPosition === 'left' && icon"
      ></marvel-icon>
      {{ label }}
      <ng-content></ng-content>
      <marvel-icon
        [icon]="icon"
        [color]="'theme'"
        *ngIf="iconPosition === 'right' && icon"
      ></marvel-icon>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MarvelButtonComponent implements OnInit {
  @Input() label: string;
  @Input() icon: string;
  @Input() iconPosition: string = 'left';
  @Input() type: string = 'primary';
  @Input() color: string;
  @Input() disabled: boolean = false;

  _useContrast = false;
  constructor() {}

  ngOnInit() {
    const { type } = this;
    if (type === 'primary') {
      this._useContrast = true;
    }
  }
}
