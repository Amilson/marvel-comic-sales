interface ServiceHttpResponseCredentials {
  httpCodeIgnore: number[];
}

export interface ServiceRequestLoadingInProgress {
  showProgress: boolean;
}

export interface MarvelServiceCredentials {
  httpResponse?: ServiceHttpResponseCredentials;
  requestInProgress?: ServiceRequestLoadingInProgress;
}
