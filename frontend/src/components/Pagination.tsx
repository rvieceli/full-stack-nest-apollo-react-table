import {
  Box,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  Select,
  Text,
} from '@chakra-ui/react';
import { useDebouncedCallback } from 'use-debounce';
import { usePagination } from '../hooks/usePagination';
import { useSearchParams } from 'react-router-dom';

export function Pagination({
  pageCount,
  canPreviousPage,
  canNextPage,
}: {
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
}) {
  const [pageIndex, pageSize] = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const setPageIndex = (pageIndex: number) => {
    searchParams.set('page', (pageIndex + 1).toString());
    setSearchParams(searchParams);
  };

  const handleDebouncedSetPageIndex = useDebouncedCallback(setPageIndex, 500);

  function previousPage() {
    if (!canPreviousPage) return;
    setPageIndex(pageIndex - 1);
  }
  function nextPage() {
    if (!canNextPage) return;
    setPageIndex(pageIndex + 1);
  }

  const setPageSize = (pageSize: number) => {
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  return (
    <Flex gap="4" alignItems="center" justifyContent="center" flex="1">
      <Flex gap="2">
        <Button onClick={() => setPageIndex(0)} isDisabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={previousPage} isDisabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Button onClick={nextPage} isDisabled={!canNextPage}>
          {'>'}
        </Button>
        <Button
          onClick={() => setPageIndex(pageCount - 1)}
          isDisabled={!canNextPage}
        >
          {'>>'}
        </Button>
      </Flex>
      <Flex alignItems="center" gap="2">
        <Box>Page</Box>
        <Text as="b">
          {pageIndex + 1} of {pageCount}
        </Text>
      </Flex>
      <Flex alignItems="center" gap="2" minW="10rem">
        <Text>Go to page:</Text>
        <NumberInput
          defaultValue={pageIndex + 1}
          min={1}
          max={pageCount}
          onChange={(value, valueAsNumber) => {
            if (Number.isNaN(valueAsNumber)) return;
            handleDebouncedSetPageIndex(valueAsNumber - 1);
          }}
        >
          <NumberInputField
            w="16"
            paddingInlineEnd="2"
            paddingInlineStart="2"
          />
        </NumberInput>
      </Flex>
      <Box>
        <Select
          display={'inline'}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
}
