import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { RegisterComicsModel } from './register-comics.model';

@Injectable()
export class MyComicsRegisterComicsService extends MarvelCommonsService implements Resolve<any> {
  constructor(marvelService: MarvelService, private firestore: AngularFirestore) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  saveData(data: RegisterComicsModel) {
    console.log('data.toJSON()');
    console.log(data.toJSON());
    this.firestore
      .collection('marvel-comics')
      //.doc(`${data.id}`)
      .add(data.toJSON())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
