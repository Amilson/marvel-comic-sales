import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { MarvelUtils } from 'marvel-style';
import { HomeSearchModel } from './home-search.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HomeService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private translateService: TranslateService
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(docs: any[], email: string) {
    return docs.map((doc: any) => {
      const data = doc.data();
      return {
        ...data,
        enableEdit: data?.createdById === email,
        createdAt: data?.createdAt?.toDate(),
        enableBuy: true,
        enableFavorite: true,
        enableDetails: true,
      };
    });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  private async getData() {
    this.__onLoadingInProgress$.next(true);
    const { email } = await this.fireAuth.currentUser;

    const search = new HomeSearchModel({
      ...this.__search,
    });

    const docRef = this.firestore.collection('comics', (ref) => {
      return search.buildParams(ref, this.__data);
    });
    docRef.get().subscribe(
      (resp: any) => {
        const data = this.getDocsData(resp);
        this.__data = [...(this.__data ? this.__data : []), ...this.mappingData(data, email)];
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
      translateOptions: {
        service: this.translateService,
        keys: ['BUTTONS', 'TITLES'],
      },
    });
    return of(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async saveFavorite(data: any) {
    const credentials = await this.fireAuth.currentUser;
    const { email, displayName } = credentials;

    data.id = `${email}${data.id}`;

    const handledData = {
      createdByName: displayName,
      createdById: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedByName: displayName,
      updatedById: email,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      currentIndex: 0,
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

  setSearch(search: HomeSearchModel) {
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
