import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { MarvelUtils } from '../../../../../projects/marvel-style/src/public-api';

@Injectable({ providedIn: 'root' })
export class MarvelDiscoveryParamsService {
  constructor(private router: Router) {}

  private getLastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (route.firstChild) return this.getLastChild(route.firstChild);

    return route;
  }

  public setData(field: string, value: any): any {
    let root = this.router.routerState.snapshot.root;
    let route: ActivatedRouteSnapshot = this.getLastChild(root);
    route.data[field] = value;
  }

  public getData(field: string): any {
    let root = this.router.routerState.snapshot.root;
    let route: ActivatedRouteSnapshot = this.getLastChild(root);

    let found: any = MarvelUtils.persistNullEmptyUndefined(route) ? route.data[field] : null;
    return found;
  }

  public getDataFromCurrentNavigation(field: string): any {
    let navigation = this.router.getCurrentNavigation();
    let state: any = null;
    if (MarvelUtils.persistNullEmptyUndefined(navigation)) state = navigation.extras.state;

    return state ? state[field] : null;
  }

  public getParam(param: string): string | null {
    let root = this.router.routerState.snapshot.root;
    let route: ActivatedRouteSnapshot = this.getLastChild(root);
    let found: string = MarvelUtils.persistNullEmptyUndefined(route)
      ? route.paramMap.get(param)
      : '';
    if (!MarvelUtils.persistNullEmptyUndefined(found)) found = this.getData(param);
    return found;
  }
}
