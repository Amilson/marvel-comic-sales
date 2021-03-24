export interface MarvelConfigTheme {
  logos: {
    favicon: string;
    toolbar: string;
    login: string;
    footer: string;
  };
}

export interface MarvelConfigi18n {
  lang: string;
  currency: string;
}

export interface MarvelConfig {
  theme?: MarvelConfigTheme;
  i18n?: MarvelConfigi18n;
}
