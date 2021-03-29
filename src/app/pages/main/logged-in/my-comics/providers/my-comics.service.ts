import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MyComicsSearchModel } from './my-comics-search.model';

@Injectable()
export class MyComicsService extends MarvelCommonsService implements Resolve<any> {
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
        enableEdit: true,
        enableRemove: true,
      };
    });
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  private async getData() {
    const { email } = await this.fireAuth.currentUser;

    const search = new MyComicsSearchModel({
      ...this.__search,
    });

    this.__onLoadingInProgress$.next(true);

    const docRef = this.firestore.collection('comics', (ref) => {
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

  setSearch(search: MyComicsSearchModel) {
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
