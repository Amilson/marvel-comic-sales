import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { MarvelUtils } from '../../../../../../../projects/marvel-style/src/public-api';

@Injectable()
export class HomeService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router
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
    const docRef = this.firestore.collection('comics');
    docRef.get().subscribe(
      (resp: any) => {
        const data = this.getDocsData(resp);
        this.__data = [...(this.__data ? this.__data : []), ...this.mappingData(data, email)];
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
  async saveFavorite(data: any) {
    const handled = await this.fireAuth.currentUser;
    const { email, displayName } = handled;

    const handledData = {
      createdByName: displayName,
      createdById: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      currentIndex: 0,
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
