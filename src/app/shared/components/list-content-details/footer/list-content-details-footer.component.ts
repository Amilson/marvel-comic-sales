import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContentDetails } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-details-footer',
  templateUrl: './list-content-details-footer.component.html',
  styleUrls: ['./list-content-details-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentDetailsFooterComponent {
  @Input() data: ListContentDetails;
}
