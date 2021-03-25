export class MarvelUtils {
  public static persistNullEmptyUndefined(tp: any): boolean {
    return tp !== null && tp !== undefined && tp !== '';
  }

  public static cutFirstLastName(value: string, tp: string = 'first') {
    let ret: string = value;
    if (value) {
      if (tp === 'first') {
        ret = value.substr(0, value.indexOf(' '));
      } else {
        ret = value.substr(value.indexOf(' ') + 1, value.length);
      }
    }
    return ret.trim();
  }

  public static getRandomString(len: number, charSet?: string): string {
    charSet =
      charSet ||
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString: string = Array.apply(null, Array(len))
      .map(function () {
        return charSet.charAt(Math.floor(Math.random() * charSet.length));
      })
      .join('');
    return randomString;
  }

  public static handleOnlyNumbers(value: any) {
    if (!value) return null;
    return value.replace(new RegExp(/[^0-9]/g), '');
  }

  public static capitalize(value: string) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

  public static formatFileSize(size: number): string {
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0;
    while (size >= 1024 && ++l) {
      size = size / 1024;
    }
    return size.toFixed(size < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }

  public static shufflue(data: any[]): any[] {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
    }
    return data;
  }

  public static truncate(text: string, maxLength: number = 25): string {
    const midChar = '...';
    if (!text) return midChar;
    if (text && text.length <= maxLength) return text;

    const left = Math.ceil(maxLength / 2);
    const right = text.length - left + 1;

    return `${text.substr(0, left)} ${midChar} ${text.substring(right)}`;
  }
}
