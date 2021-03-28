import { SharedFilterCharactersModel } from './filter-characters.model';

export class SharedFilterModel {
  name: string;

  characters: SharedFilterCharactersModel[];

  order: string;

  size: number = 15;

  constructor(data?: any) {
    this.name = data?.name;
    this.characters = data?.characters || [];
    this.order = data?.order;
    this.size = data?.size || 15;
  }

  public handleCharacters(data: SharedFilterCharactersModel, type: boolean) {
    this.characters = this.characters.filter(({ id }) => {
      return id !== data.id;
    });
    if (type) this.characters.push(data);
  }
}
