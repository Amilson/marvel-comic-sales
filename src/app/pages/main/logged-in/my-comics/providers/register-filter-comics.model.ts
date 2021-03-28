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

export class MyComicsRegisterFilterComicsModel {
  id: number;
  title: string;
  format: string;
  pageCount: number;
  thumbnail: Thumbnail;

  constructor(data?: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.format = data?.format;
    this.pageCount = data?.pageCount;
    this.thumbnail = new Thumbnail(data?.thumbnail);
  }
}
