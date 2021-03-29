import { SharedFilterCharactersModel } from './filter-characters.model';

export class SharedFilterModel {
  name: string;

  characters: SharedFilterCharactersModel[];

  orderField: 'title' | 'createdAt' | 'price';

  orderType: 'desc' | 'asc';

  limit: number = 15;

  constructor(data?: any) {
    this.name = data?.name;
    this.characters = data?.characters || [];
    this.limit = data?.limit || 15;
    this.orderField = 'title';
    this.orderType = 'asc';
    if (data?.order === 'MOST-RECENT') {
      this.orderField = 'createdAt';
      this.orderType = 'desc';
    } else if (data?.order === 'PRICE-LOW-TO-HIGH') {
      this.orderField = 'price';
      this.orderType = 'asc';
    } else if (data?.order === 'PRICE-HIGH-TO-LOW') {
      this.orderField = 'price';
      this.orderType = 'desc';
    }
  }

  public handleCharacters(data: SharedFilterCharactersModel, type: boolean) {
    this.characters = this.characters.filter(({ id }) => {
      return id !== data.id;
    });
    if (type) this.characters.push(data);
  }
}
