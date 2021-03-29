import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/app';

@Injectable()
export class MyFavoritesService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(docs: any[]) {
    return docs.map((doc: any) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data?.createdAt?.toDate(),
      };
    });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async getData() {
    const { email } = await this.fireAuth.currentUser;
    const docRef = this.firestore.collection('favorite_comics', (ref) =>
      ref.where('createdById', '==', email)
    );
    docRef.get().subscribe(
      (resp: any) => {
        const data = this.getDocsData(resp);
        this.__data = [...(this.__data ? this.__data : []), ...this.mappingData(data)];
        this.__onDataChanged$.next(null);
        this.__onLoadingInProgress$.next(false);
      },
      (error) => {
        console.log('Error getting document:', error);
      }
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    super.resolve(route, state, {
      callbackMain: () => {
        this.__data = null;
        this.__page = null;
        this.getData();
      },
      callbackPagination: this.getData.bind(this),
    });

    return of(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async sortFavorite(data: any) {
    const handled = await this.fireAuth.currentUser;
    const { email, displayName } = handled;

    const handledData = {
      updatedByName: displayName,
      updatedById: email,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.firestore
      .doc(`favorite_comics/${data.id}`)
      .set(
        {
          ...data,
          ...handledData,
        },
        { merge: true }
      )
      .then(() => {
        //TODO
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
