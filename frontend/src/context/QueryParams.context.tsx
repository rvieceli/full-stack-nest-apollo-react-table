import { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const QueryParamsContext = createContext<URLSearchParams | null>(null);

export function QueryParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  return (
    <QueryParamsContext.Provider value={queryParams}>
      {children}
    </QueryParamsContext.Provider>
  );
}

export function useQueryParams() {
  const context = useContext(QueryParamsContext);

  if (!context) {
    throw new Error('useQueryParams must be used within a QueryParamsProvider');
  }

  return context;
}
