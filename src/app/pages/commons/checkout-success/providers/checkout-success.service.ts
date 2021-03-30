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
export class CheckoutSuccessService extends MarvelCommonsService implements Resolve<any> {
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
      enableEdit: doc?.createdById === email,
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
}
