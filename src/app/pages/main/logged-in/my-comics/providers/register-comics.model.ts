class Thumbnail {
  path: string;
  extension: string;
  resource: string;

  constructor(data?: any) {
    this.path = data?.path;
    this.extension = data?.extension;
    this.resource = data?.resource;
  }
}

export class RegisterComicsModel {
  id: number;
  title: string;
  format: string;
  pageCount: number;
  thumbnail: Thumbnail;
  condition: string;
  price: number;
  description: string;

  constructor(data?: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.format = data?.format;
    this.pageCount = data?.pageCount;
    this.thumbnail = data?.thumbnail;
    this.condition = data?.condition;
    this.price = data?.price;
    this.description = data?.description;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      format: this.format,
      pageCount: this.pageCount,
      thumbnail_path: this.thumbnail.path,
      condition: this.condition,
      price: this.price,
      description: this.description,
    };
  }
}
