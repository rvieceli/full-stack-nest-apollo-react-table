import { HeaderContext } from '@tanstack/react-table';
import { HStack, Input, InputProps, Text } from '@chakra-ui/react';
import { useDebouncedCallback } from 'use-debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { camelCase } from '../utils/camelCase';

export function SearchInput({
  columnId,
  wait = 500,
  ...props
}: InputProps & { wait?: number; columnId: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const defaultValue = queryParams.get(columnId) || undefined;

  const handleDebouncedOnChange = useDebouncedCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    const value = e.target.value.trim();

    if (value === defaultValue) return;

    if (!value) {
      queryParams.delete(columnId);
    } else {
      queryParams.set(columnId, value);
    }

    navigate({ search: queryParams.toString() });
  }, wait);

  return (
    <Input
      role="search"
      defaultValue={defaultValue}
      size="xs"
      placeholder="Search"
      {...props}
      onChange={handleDebouncedOnChange}
    />
  );
}

export function headerWithSearchAsStringHelper<
  T extends HeaderContext<any, string>,
>(info: T) {
  return (
    <HStack>
      <Text>{info.column.id}</Text>
      <SearchInput columnId={info.column.id} width="auto" />
    </HStack>
  );
}
