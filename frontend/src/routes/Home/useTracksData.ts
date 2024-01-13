import { useQuery } from '@apollo/client';
import { document } from './document.graphql';

import { numberOrUndefined } from '../../utils/numberOrUndefined';
import { atLeastOneOrUndefined } from '../../utils/atLeastOneOrUndefined';
import { usePagination } from '../../hooks/usePagination';
import { usePreviousData } from '../../hooks/usePreviousData';
import { useSearchParams } from 'react-router-dom';

export function useTracksData() {
  const [searchParams] = useSearchParams();
  const [pageIndex, pageSize] = usePagination();

  const { data, loading } = useQuery(document, {
    variables: {
      page: pageIndex,
      pageSize,
      artistName: atLeastOneOrUndefined(searchParams.get('artist_name')),
      genreName: atLeastOneOrUndefined(searchParams.get('genre')),
      minPrice: numberOrUndefined(searchParams.get('minPrice')),
      maxPrice: numberOrUndefined(searchParams.get('maxPrice')),
    },
    fetchPolicy: 'cache-and-network',
  });

  const previousData = usePreviousData(data);

  return loading ? previousData : data;
}
