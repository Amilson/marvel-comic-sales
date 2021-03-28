import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SharedFilterModel } from '../filter/providers';

@Component({
  selector: 'shared-filtered',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedFilteredComponent {
  @Input() data: SharedFilterModel;

  @Output() onFilter = new EventEmitter<any>();

  constructor() {
    //not to do
  }

  private onHandleFilter() {
    this.onFilter.next(this.data);
  }

  onChangeCharacters(event: any, type: boolean) {
    this.data.handleCharacters(event, type);
    this.onHandleFilter();
  }
}
