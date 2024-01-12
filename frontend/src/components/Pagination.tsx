import {
  Box,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  Select,
  Text,
} from '@chakra-ui/react';
import { PaginationState } from '@tanstack/react-table';
import { useDebouncedCallback } from 'use-debounce';

export function Pagination({
  pagination,
  pageCount,
  canPreviousPage,
  canNextPage,
  setPageIndex,
  previousPage,
  nextPage,
  setPageSize,
}: {
  pagination: PaginationState;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  setPageIndex: (pageIndex: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
}) {
  const handleDebouncedSetPageIndex = useDebouncedCallback(setPageIndex, 500);

  return (
    <Flex gap="4" alignItems="center" justifyContent="center" mt="6">
      <Flex gap="2">
        <Button onClick={() => setPageIndex(0)} isDisabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={() => previousPage()} isDisabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Button onClick={() => nextPage()} isDisabled={!canNextPage}>
          {'>'}
        </Button>
        <Button
          onClick={() => setPageIndex(pageCount - 1)}
          isDisabled={!canNextPage}
        >
          {'>>'}
        </Button>
      </Flex>
      <Flex alignItems="center" gap="1">
        <Box>Page</Box>
        <Text as="b">
          {pagination.pageIndex + 1} of {pageCount}
        </Text>
      </Flex>
      <Flex alignItems="center" gap="1" minW="10rem">
        <Text>Go to page:</Text>
        <NumberInput
          defaultValue={pagination.pageIndex + 1}
          min={1}
          max={pageCount}
          onChange={(value, valueAsNumber) => {
            if (Number.isNaN(valueAsNumber)) return;
            handleDebouncedSetPageIndex(valueAsNumber - 1);
          }}
        >
          <NumberInputField
            w="16"
            paddingInlineEnd={1}
            paddingInlineStart={1}
          />
        </NumberInput>
      </Flex>
      <Box>
        <Select
          display={'inline'}
          value={pagination.pageSize}
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
