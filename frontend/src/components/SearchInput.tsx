import { HeaderContext } from '@tanstack/react-table';
import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { useRef } from 'react';

export function SearchInput({
  columnId,
  wait = 500,
  ...props
}: InputProps & { wait?: number; columnId: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

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

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    searchParams.delete(columnId);
    setSearchParams(searchParams);
  }

  return (
    <InputGroup size="xs" {...props}>
      <Input
        ref={inputRef}
        role="search"
        defaultValue={defaultValue}
        size="xs"
        placeholder="Search"
        onChange={handleDebouncedOnChange}
      />
      <InputRightAddon
        as={IconButton}
        isDisabled={!defaultValue}
        onClick={handleClear}
        aria-label="clear filter"
        icon={defaultValue ? <CloseIcon boxSize="2" /> : <SearchIcon />}
      />
    </InputGroup>
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
