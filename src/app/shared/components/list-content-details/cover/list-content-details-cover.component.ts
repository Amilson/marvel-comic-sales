import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-details-cover',
  template: '',
  styleUrls: ['./list-content-details-cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentDetailsCoverComponent {
  @Input() data: ListContent;

  constructor(private elRef: ElementRef) {
    //not to do
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.style.setProperty(
      '--mc-content-details-cover-image',
      `url(${this.data?.cover})`
    );
  }
}
