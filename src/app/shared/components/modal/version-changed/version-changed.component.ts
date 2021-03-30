import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MarvelModalConfig } from 'marvel-style';

@Component({
  selector: 'shared-version-changed',
  templateUrl: './version-changed.component.html',
  styleUrls: ['./version-changed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedVersionChangedComponent {
  @Input() config: MarvelModalConfig;

  @Input() modalRef: any;

  onClose() {
    document.location.reload();
  }
}
