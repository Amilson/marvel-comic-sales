class Thumbnail {
  path: string;
  extension: string;
  resource: string;

  constructor(data?: any) {
    this.path = data?.path;
    this.extension = data?.extension;
    this.resource = `${data?.path}/portrait_small.jpg`;
  }
}

export class CheckoutCharactersModel {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.description = data?.description;
    this.thumbnail = new Thumbnail(data?.thumbnail);
  }
}
