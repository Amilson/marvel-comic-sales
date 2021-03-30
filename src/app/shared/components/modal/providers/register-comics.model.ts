import { MarvelUtils } from 'marvel-style';

export class SharedRegisterComicsModel {
  id: string;
  comicId: number;
  title: string;
  format: string;
  pageCount: number;
  thumbnail_path: string;
  condition: string;
  price: number;
  description: string;
  charactersAsArray: string[];
  createdAt: string;
  createdById: string;
  createdByName: string;
  updatedAt: string;
  updatedById: string;
  updatedByName: string;
  screenType: string;

  constructor(data?: any) {
    this.id = data?.id || MarvelUtils.getRandomString(30);
    this.comicId = data?.comicId;
    this.title = data?.title;
    this.format = data?.format;
    this.pageCount = data?.pageCount;
    this.thumbnail_path = data?.thumbnail_path;
    this.condition = data?.condition;
    this.price = data?.price;
    this.description = data?.description;
    this.createdAt = data?.createdAt || '';
    this.createdById = data?.createdById || '';
    this.createdByName = data?.createdByName || '';
    this.updatedAt = data?.updatedAt || '';
    this.updatedById = data?.updatedById || '';
    this.updatedByName = data?.updatedByName || '';
    this.charactersAsArray = data?.charactersAsArray || [];
    this.screenType = data?.screenType || (data?.id ? 'edit' : 'new');
  }

  toJSON() {
    return {
      id: this.id,
      comicId: this.comicId,
      title: this.title,
      format: this.format,
      pageCount: this.pageCount,
      thumbnail_path: this.thumbnail_path,
      condition: this.condition,
      price: this.price,
      description: this.description,
      charactersAsArray: this.charactersAsArray,
      createdAt: this.createdAt,
      createdById: this.createdById,
      createdByName: this.createdByName,
      updatedAt: this.updatedAt,
      updatedById: this.updatedById,
      updatedByName: this.updatedByName,
    };
  }
}
