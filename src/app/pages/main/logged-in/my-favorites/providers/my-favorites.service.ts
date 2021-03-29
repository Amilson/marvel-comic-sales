import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { MarvelUtils } from '../../../../../../../projects/marvel-style/src/public-api';
import { MyFavoritesSearchModel } from './my-favorites-search.model';

@Injectable()
export class MyFavoritesService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router
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
        enableMove: true,
      };
    });
  }

  /*@MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async getData() {
    const { email } = await this.fireAuth.currentUser;
    const docRef = this.firestore.collection('favorite_comics', (ref) =>
      ref
        .where('createdById', '==', email)
        .orderBy('currentIndex', 'asc')
        .orderBy('updatedAt', 'desc')
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
  }*/
  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  private async getData() {
    const { email } = await this.fireAuth.currentUser;

    const search = new MyFavoritesSearchModel({
      ...this.__search,
    });

    this.__onLoadingInProgress$.next(true);

    const docRef = this.firestore.collection('favorite_comics', (ref) => {
      return search.buildParams(ref, this.__data, email);
    });
    docRef.get().subscribe(
      (resp: any) => {
        const data = this.getDocsData(resp);
        this.__data = [...(this.__data ? this.__data : []), ...this.mappingData(data)];
        let page = null;
        if (data && data.length > 0) {
          page = {
            offset: 0,
            limit: 15,
            total: 9999,
          };
        } else {
          page = {
            offset: 9999,
            limit: 15,
            total: 9999,
          };
        }
        this.__page = page;

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
  async sort(data: any) {
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
        this.excludeNonUsedFields({
          ...data,
          ...handledData,
        }),
        { merge: true }
      )
      .then(() => {
        //TODO
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
  async remove(data: any) {
    this.firestore
      .doc(`favorite_comics/${data.id}`)
      .delete()
      .then(() => {
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

  setSearch(search: MyFavoritesSearchModel) {
    this.__data = null;
    this.__search = search;

    this.setPage({
      page: {
        offset: 0,
        limit: search.limit,
        total: 9999,
      },
    });

    this.getData();
  }
}
