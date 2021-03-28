import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ListContentDetails } from 'app/interfaces';

@Component({
  selector: 'shared-list-content-details',
  templateUrl: './list-content-details.component.html',
  styleUrls: ['./list-content-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedListContentDetailsComponent {
  @Input() data: ListContentDetails;
}
