import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-header',
  templateUrl: './list-content-header.component.html',
  styleUrls: ['./list-content-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentHeaderComponent {
  @Input() data: ListContent;
}
