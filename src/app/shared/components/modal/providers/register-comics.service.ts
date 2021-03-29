import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { SharedRegisterComicsModel } from './register-comics.model';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  MarvelStyleModalService,
  MarvelUtils,
} from '../../../../../../projects/marvel-style/src/public-api';

@Injectable()
export class SharedComicsRegisterComicsService
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
  async saveData(data: SharedRegisterComicsModel) {
    const handled = await this.fireAuth.currentUser;
    const { email, displayName } = handled;
    const type = data?.screenType === 'new' ? 'created' : 'updated';

    let filterAsArray = [''];
    for (let i = 1; i < data.title.length + 1; i++) {
      filterAsArray.push(data.title.substring(0, i).toLowerCase());
    }
    filterAsArray = [...filterAsArray, ...data.charactersAsArray];

    const handledData = {
      filterAsArray: filterAsArray,
      [`${type}ByName`]: displayName,
      [`${type}ById`]: email,
      [`${type}At`]: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.firestore
      .doc(`comics/${data.id}`)
      .set(
        this.excludeNonUsedFields({
          ...data,
          ...handledData,
        }),
        { merge: true }
      )
      .then(() => {
        this.modalService.closeAll();
        this.router.navigate(
          [`/main/logged-in/my-comics/refresh/${MarvelUtils.getRandomString(30)}`],
          {
            skipLocationChange: true,
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async remove(data: SharedRegisterComicsModel) {
    this.firestore
      .doc(`comics/${data.id}`)
      .delete()
      .then(() => {
        this.modalService.closeAll();
        this.router.navigate(
          [`/main/logged-in/my-comics/refresh/${MarvelUtils.getRandomString(30)}`],
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
