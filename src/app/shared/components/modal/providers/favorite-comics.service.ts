import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { SharedFavoriteComicsModel } from './favorite-comics.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { MarvelStyleModalService, MarvelUtils } from 'marvel-style';

@Injectable()
export class SharedComicsFavoriteComicsService
  extends MarvelCommonsService
  implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private modalService: MarvelStyleModalService
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async remove(data: SharedFavoriteComicsModel) {
    this.firestore
      .doc(`favorite_comics/${data.id}`)
      .delete()
      .then(() => {
        this.modalService.closeAll();
        this.router.navigate(
          [`/main/logged-in/my-favorites/refresh/${MarvelUtils.getRandomString(30)}`],
          {
            skipLocationChange: true,
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
