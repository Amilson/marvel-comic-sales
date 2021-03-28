export class MyComicsRegisterFilterSearchModel {
  title: string;

  constructor(data?: any) {
    this.title = data?.title;
  }

  public buildParams(): string {
    let ret: string = '';
    if (this.title) {
      ret = `titleStartsWith=${this.title}`;
    }
    return ret;
  }
}
