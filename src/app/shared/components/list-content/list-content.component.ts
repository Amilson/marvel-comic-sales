import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentComponent {
  @Input() data: ListContent;
}
