export interface MarvelConfigTheme {
  logos: {
    favicon: string;
    toolbar: string;
    signin: string;
    signup: string;
    footer: string;
  };
  externalLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
}

export interface MarvelConfigi18n {
  lang?: string;
  currency?: string;
}

export interface MarvelConfig {
  theme?: MarvelConfigTheme;
  i18n?: MarvelConfigi18n;
}
