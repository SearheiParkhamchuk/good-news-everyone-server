import { UUID } from '@/src/05-shared/types/uuid';

export type ArticlesGetMany = {
  query?: string;
  page: number;
  size: number;
  orderBy?: {
    by: string;
    direction: 'DESC' | 'ASC';
  };
  filter_by?: {
    categories?: Array<{ uuid: UUID }>;
  };
};
