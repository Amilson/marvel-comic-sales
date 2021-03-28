import { MarvelCommonsService } from 'app/core/services/commons';
import { MarvelResponsePaged } from './marvel-response-paged';

interface Sort {
  field?: string;
  direction?: string;
}

export interface MarvelRequestPaged {
  sort?: Sort;
  page?: MarvelResponsePaged;
}
