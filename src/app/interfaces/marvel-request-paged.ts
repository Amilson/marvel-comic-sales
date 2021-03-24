import { MarvelCommonsService } from 'app/core/services/commons';

interface Sort {
  field?: string;
  direction?: string;
}

interface Page {
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface MarvelRequestPaged {
  sort?: Sort;
  page?: Page;
}

export interface MarvelPaginationOptions {
  mainElement?: string;
  service: MarvelCommonsService;
}
