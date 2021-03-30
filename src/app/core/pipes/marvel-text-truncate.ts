import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marvelTextTruncate',
})
export class MarvelTextTruncatePipe implements PipeTransform {
  constructor() {
    // not to do
  }

  transform(text: string, maxLength: number = 25): string {
    const midChar = '...';
    if (!text) return midChar;
    if (text && text.length <= maxLength) return text;

    const left = Math.ceil(maxLength / 2);
    const right = text.length - left + 1;

    return `${text.substr(0, left)} ${midChar} ${text.substring(right)}`;
  }
}
