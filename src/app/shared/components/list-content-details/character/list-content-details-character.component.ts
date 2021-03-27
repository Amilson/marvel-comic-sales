import { AfterViewInit, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-details-character',
  templateUrl: './list-content-details-character.component.html',
  styleUrls: ['./list-content-details-character.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentDetailsCharacterComponent implements AfterViewInit {
  @Input() data: ListContent;

  constructor(private elRef: ElementRef) {
    //not to do
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.style.setProperty(
      '--mc-content-details-character-image',
      `url(${this.data?.cover})`
    );
  }
}
