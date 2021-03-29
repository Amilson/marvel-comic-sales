import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MarvelModalConfig } from '../../../../../../projects/marvel-style/src/public-api';
import { SharedComicsFavoriteComicsService } from '../providers/favorite-comics.service';

@Component({
  selector: 'shared-comics-delete-favorite',
  templateUrl: './delete-favorite.component.html',
  styleUrls: ['./delete-favorite.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedComicsDeleteFavoriteComponent {
  @Input() config: MarvelModalConfig;

  @Input() modalRef: any;

  constructor(private favoriteComicsService: SharedComicsFavoriteComicsService) {
    //not to do
  }

  onHandleConfirm() {
    this.favoriteComicsService.remove(this.config.data);
  }
}
