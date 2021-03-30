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
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DetailsService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private marvelDiscovery: MarvelDiscoveryParamsService,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private translateService: TranslateService
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  private mappingData(doc: any, email: string) {
    return {
      ...doc,
      enableEdit: doc?.createdById === email,
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

    const comicData = marvelDiscovery.getDataFromCurrentNavigation('comicData');

    super.resolve(route, state, {
      callbackMain: () => {
        this.__data = null;
        this.__page = null;
        if (!comicData) {
          router.navigate(['/main/logged-out']);
          return;
        }

        this.getData(comicData);
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

  async buy(data: any) {
    const { router } = this;
    const credentials = await this.verifyLogged(this.fireAuth, () => {
      router.navigate(['/auth/signin'], {
        state: {
          dataAfterLogin: {
            type: 'buy',
            data,
          },
        },
      });
    });
    if (!credentials) return;
    router.navigate(['/main/logged-int/checkout'], {
      state: {
        comicData: data,
      },
    });
  }
}
