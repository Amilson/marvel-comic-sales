import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MarvelCoreService } from 'app/core/decorators/marvel-decorators';
import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelService } from 'app/core/services/marvel-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MyComicsService extends MarvelCommonsService implements Resolve<any> {
  constructor(
    marvelService: MarvelService,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    super(marvelService);
    this.__onDataChanged$ = new BehaviorSubject(null);
  }

  @MarvelCoreService({
    requestInProgress: {
      showProgress: true,
    },
  })
  getData() {
    /*const docRef = this.firestore.collection('marvel-comics');
    docRef.get().subscribe(
      (doc) => {
        doc.docs.forEach((doc: any) => {
          console.log(doc);
        });
      },
      (error) => {
        console.log('Error getting document:', error);
      }
    );*/
    console.log('this.auth.user');
    this.auth.user.subscribe(
      (doc) => {
        console.log(doc);
      },
      (error) => {
        console.log('Error getting document:', error);
      }
    );

    this.firestore
      .collection('marvel-comics', (ref) => ref.where('id', '==', 82967))
      .valueChanges()
      .subscribe(
        (doc) => {
          console.log(doc);
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

    return null;
  }
}
