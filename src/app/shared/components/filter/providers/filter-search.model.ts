export class SharedFilterSearchModel {
  characterName: string;

  constructor(data?: any) {
    this.characterName = data?.characterName;
  }

  public buildParams(): string {
    let ret: string = '';
    if (this.characterName) {
      ret = `nameStartsWith=${this.characterName}`;
    }
    return ret;
  }
}
