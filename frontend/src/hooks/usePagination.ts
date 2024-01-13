import { useSearchParams } from 'react-router-dom';

export function usePagination() {
  const [searchParams] = useSearchParams();

  const page = (Number(searchParams.get('page')) || 1) - 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;

  return [page, pageSize];
}
