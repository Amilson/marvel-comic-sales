import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { RegisterComicsModel } from './register-comics.model';
import firebase from 'firebase/app';
import {
  MarvelStyleModalService,
  MarvelUtils,
} from '../../../../../../../projects/marvel-style/src/public-api';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class MyComicsRegisterComicsService extends MarvelCommonsService implements Resolve<any> {
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
  async saveData(data: RegisterComicsModel) {
    const { email, displayName } = await this.fireAuth.currentUser;

    const type = data?.screenType === 'new' ? 'created' : 'updated';

    const handledData = {
      [`${type}ByName`]: displayName,
      [`${type}ById`]: email,
      [`${type}At`]: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.firestore
      .doc(`comics/${data.id}`)
      .set(
        {
          ...data.toJSON(),
          ...handledData,
        },
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
  async removeData(data: RegisterComicsModel) {
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
