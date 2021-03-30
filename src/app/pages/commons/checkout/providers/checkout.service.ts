import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { MarvelDiscoveryParamsService } from 'app/core/services/routes';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MarvelUtils } from 'marvel-style';
import firebase from 'firebase/app';

@Injectable()
export class CheckoutService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private marvelDiscovery: MarvelDiscoveryParamsService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(doc: any, email: string) {
    return {
      ...doc,
      enableEdit: false,
      enableFavorite: false,
      enableBuy: false,
      enableDetails: false,
    };
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  private async getData(data: any) {
    this.__onLoadingInProgress$.next(true);
    const credentials = await this.fireAuth.currentUser;
    const email = credentials?.email || '';

    this.__data = {
      ...this.mappingData(data, email),
    };
    this.__onDataChanged$.next(null);
    this.__onLoadingInProgress$.next(false);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
    const { router, marvelDiscovery } = this;
    this.__data = null;
    this.__page = null;

    const comicData = marvelDiscovery.getDataFromCurrentNavigation('comicData');

    if (!comicData) {
      router.navigate(['/main/logged-out']);
      return;
    }

    this.getData(comicData);
    return of(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async saveFavorite(data: any) {
    const credentials = await this.verifyLogged(this.fireAuth, () => {
      this.router.navigate(['/auth/signin'], {
        state: {
          dataAfterLogin: {
            type: 'saveFavorite',
            data,
          },
        },
      });
    });
    if (!credentials) return;
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

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  async buy(data: any) {
    const credentials = await this.verifyLogged(this.fireAuth, () => {
      this.router.navigate(['/auth/signin'], {
        state: {
          dataAfterLogin: {
            type: 'buy',
            data,
          },
        },
      });
    });
    if (!credentials) return;
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
      .doc(`ordered_comics/${data.id}`)
      .set(
        this.excludeNonUsedFields({
          ...data,
          ...handledData,
        }),
        { merge: true }
      )
      .then(() => {
        this.router.navigate(['/main/logged-in/checkout-success'], {
          state: {
            comicData: data,
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
