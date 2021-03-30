import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContentDetails } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-details-header',
  templateUrl: './list-content-details-header.component.html',
  styleUrls: ['./list-content-details-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentDetailsHeaderComponent {
  @Input() data: ListContentDetails;

  @Input() settings: any;

  @Input() isLoading: boolean = true;
}
