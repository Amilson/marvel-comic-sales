import { Injectable, Inject } from '@angular/core';
import { MarvelStyleSettings, MarvelStyleFontSettings } from '../../interfaces';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class MarvelStyleThemeSettingsService {
  constructor(@Inject(DOCUMENT) private doc: any) {}

  private applyColors(settings: MarvelStyleSettings): any {
    const colors: any = settings.colors;

    let bucketColors = null;

    ['theme', 'error', 'warning', 'success', 'question'].forEach((color) => {
      Object.entries(colors[color] as any).forEach(([paletteKey, paletteValue]) => {
        if (paletteKey === 'contrast') {
          Object.entries(paletteValue).forEach(([paletteContrastKey, paletteContrastValue]) => {
            document.documentElement.style.setProperty(
              `--mc-color-${color}-contrast-${paletteContrastKey}`,
              `${paletteContrastValue}`
            );
            bucketColors = {
              ...bucketColors,
              [`--mc-color-${color}-contrast-${paletteContrastKey}`]: `${paletteContrastValue}`,
            };
          });
        } else {
          document.documentElement.style.setProperty(
            `--mc-color-${color}-${paletteKey}`,
            `${paletteValue}`
          );
          bucketColors = {
            ...bucketColors,
            [`--mc-color-${color}-${paletteKey}`]: `${paletteValue}`,
          };
        }
      });
    });

    return bucketColors;
  }

  private applyFonts(settings: MarvelStyleSettings) {
    const font: MarvelStyleFontSettings = {
      url:
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap',
      name: 'Roboto',
      ...settings.font,
    };

    document.documentElement.style.setProperty(`--mc-font-name`, `${font.name}`);

    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', `${font.url}`);
    this.doc.head.appendChild(link);
  }

  private applyTheme(settings: MarvelStyleSettings) {
    const { theme } = settings;
    document.title = `${theme.title}`;

    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/x-icon');
    link.setAttribute('href', `${theme.favicon}`);
    this.doc.head.appendChild(link);
  }

  public apply(config: MarvelStyleSettings, callback?: Function) {
    const bucketColors = this.applyColors(config);
    this.applyFonts(config);
    this.applyTheme(config);
    setTimeout(() => {
      if (callback)
        callback({
          bucketColors,
        });
    }, 500);
  }
}
