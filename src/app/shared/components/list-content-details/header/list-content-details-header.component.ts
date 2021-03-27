import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-details-header',
  templateUrl: './list-content-details-header.component.html',
  styleUrls: ['./list-content-details-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentDetailsHeaderComponent {
  @Input() data: ListContent;
}
