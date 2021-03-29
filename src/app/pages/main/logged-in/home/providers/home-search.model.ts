import { CollectionReference } from '@angular/fire/firestore';
import { SharedFilterCharactersModel } from 'app/shared/components';

export class HomeSearchModel {
  name: string;

  characters: SharedFilterCharactersModel[] = [];

  limit: number;

  orderField: 'title' | 'createdAt' | 'price';

  orderType: 'desc' | 'asc';

  constructor(data?: any) {
    this.name = data?.name;
    this.characters = data?.characters || [''];
    this.limit = data?.limit || 15;
    this.orderField = data?.orderField || 'title';
    this.orderType = data?.orderType || 'asc';
  }

  public buildParams(ref: CollectionReference<any>, data: any[]): any {
    let lastInResponse: any = data || [];
    let or = null;
    if (this.orderField === 'title') {
      or = '';
    } else if (this.orderField === 'createdAt') {
      or = new Date();
    } else if (this.orderField === 'price') {
      or = 0.0;
      if (this.orderType === 'desc') {
        or = 9999999999;
      }
    }
    lastInResponse = lastInResponse[lastInResponse?.length - 1]?.[this.orderField] || or;

    let filterAsArray = [''];
    for (let i = 1; i < this.name?.length + 1; i++) {
      filterAsArray.push(this.name?.substring(0, i));
    }

    const charactersFilter = this.characters
      .filter((_) => _)
      .map((character: any) => `${character.id}`);

    filterAsArray = [...filterAsArray, ...charactersFilter].filter((_) => _);

    if (filterAsArray.length > 0) {
      return ref
        .limit(this.limit)
        .where('filterAsArray', 'array-contains-any', filterAsArray)
        .orderBy(this.orderField, this.orderType)
        .startAfter(lastInResponse);
    }

    return ref
      .limit(this.limit)
      .orderBy(this.orderField, this.orderType)
      .startAfter(lastInResponse);
  }
}
