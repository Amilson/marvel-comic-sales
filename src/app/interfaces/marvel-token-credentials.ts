interface TokenCredentialsClearIgnore {
  ignore: string[];
}

export interface MarvelTokenCredentials {
  //TODO
  username?: string;
  program?: string;
  accessToken?: string;
  refreshToken?: string;
  companyId?: string;
  governmentId?: string;
  companyTypeUrl?: string;
  companyType?: string;
  role?: string;
  programAdmin?: boolean | string;
  programType?: string;
  _clearIgnore?: TokenCredentialsClearIgnore;
}
