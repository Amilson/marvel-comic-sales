import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MarvelModalConfig } from '../../../../../../../../projects/marvel-style/src/public-api';
import { MyComicsRegisterComicsService } from '../../providers';

@Component({
  selector: 'app-my-comics-logedin-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyComicsDeleteComponent {
  @Input() config: MarvelModalConfig;

  @Input() modalRef: any;

  constructor(private registerComicsService: MyComicsRegisterComicsService) {
    //not to do
  }

  onHandleConfirm() {
    this.registerComicsService.removeData(this.config.data);
  }
}
