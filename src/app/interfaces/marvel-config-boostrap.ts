export interface MarvelConfigBoostrap {
  version: string;
  showNewVersion: boolean;
  maintenance: {
    closed: boolean;
    startDate: string;
    endDate: string;
  };
}
