export class SharedComicsRegisterFilterComicsModel {
  comicId: number;
  title: string;
  format: string;
  pageCount: number;
  thumbnail_path: string;

  constructor(data?: any) {
    this.comicId = data?.id;
    this.title = data?.title;
    this.format = data?.format;
    this.pageCount = data?.pageCount;
    this.thumbnail_path = data?.thumbnail?.path;
  }
}
