import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContent } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-footer',
  templateUrl: './list-content-footer.component.html',
  styleUrls: ['./list-content-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentFooterComponent {
  @Input() data: ListContent;

  @Input() settings: any;

  @Input() isLoading: boolean = true;
}
