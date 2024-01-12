import { useQuery } from '@apollo/client';
import { document } from './document.graphql';

import { numberOrUndefined } from '../../utils/numberOrUndefined';
import { atLeastOneOrUndefined } from '../../utils/atLeastOneOrUndefined';
import { usePagination } from '../../hooks/usePagination';
import { useQueryParams } from '../../context/QueryParams.context';
import { usePreviousData } from '../../hooks/usePreviousData';

export function useTracksData() {
  const queryParams = useQueryParams();
  const [pageIndex, pageSize] = usePagination();

  const { data, loading } = useQuery(document, {
    variables: {
      page: pageIndex,
      pageSize,
      artistName: atLeastOneOrUndefined(queryParams.get('artist_name')),
      genreName: atLeastOneOrUndefined(queryParams.get('genre')),
      minPrice: numberOrUndefined(queryParams.get('minPrice')),
      maxPrice: numberOrUndefined(queryParams.get('maxPrice')),
    },
    fetchPolicy: 'cache-and-network',
  });

  const previousData = usePreviousData(data);

  return loading ? previousData : data;
}
