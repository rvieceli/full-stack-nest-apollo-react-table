import { HeaderContext } from '@tanstack/react-table';
import { HStack, Input, InputProps, Text } from '@chakra-ui/react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

export function SearchInput({
  columnId,
  wait = 500,
  ...props
}: InputProps & { wait?: number; columnId: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValue = searchParams.get(columnId) || undefined;

  const handleDebouncedOnChange = useDebouncedCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    const value = e.target.value.trim();

    if (value === defaultValue) return;

    if (!value) {
      searchParams.delete(columnId);
    } else {
      searchParams.set(columnId, value);
    }

    if (searchParams.has('page')) {
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
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
