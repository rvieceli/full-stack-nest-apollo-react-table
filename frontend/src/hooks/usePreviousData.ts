import { useEffect, useRef } from 'react';

export function usePreviousData<T>(data: T) {
  const ref = useRef<T>();

  useEffect(() => {
    if (data) {
      ref.current = data;
    }
  }, [data]);

  return ref.current;
}
