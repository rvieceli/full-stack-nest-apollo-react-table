import { useQueryParams } from '../context/QueryParams.context';

export function usePagination() {
  const queryParams = useQueryParams();

  const page = (Number(queryParams.get('page')) || 1) - 1;
  const pageSize = Number(queryParams.get('pageSize')) || 10;

  return [page, pageSize];
}
