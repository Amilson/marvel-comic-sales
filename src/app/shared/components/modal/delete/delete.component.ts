import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MarvelModalConfig } from 'marvel-style';
import { SharedComicsRegisterComicsService } from '../providers/register-comics.service';

@Component({
  selector: 'shared-comics-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedComicsDeleteComponent {
  @Input() config: MarvelModalConfig;

  @Input() modalRef: any;

  constructor(private registerComicsService: SharedComicsRegisterComicsService) {
    //not to do
  }

  onHandleConfirm() {
    this.registerComicsService.remove(this.config.data);
  }
}
