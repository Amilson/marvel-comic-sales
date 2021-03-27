import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-cover',
  templateUrl: './list-content-cover.component.html',
  styleUrls: ['./list-content-cover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentCoverComponent {
  @Input() data: ListContent;
}
