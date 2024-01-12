import { useQuery } from '@apollo/client';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { document } from './document.graphql';
import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../../components/Pagination';

import { numberOrUndefined } from '../../utils/numberOrUndefined';
import { atLeastOneOrUndefined } from '../../utils/atLeastOneOrUndefined';

import { columns } from './columns';

export function HomePage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const page = (Number(queryParams.get('page')) || 1) - 1;
  const pageSize = Number(queryParams.get('pageSize')) || 10;

  const { data } = useQuery(document, {
    variables: {
      page,
      pageSize,
      artistName: atLeastOneOrUndefined(queryParams.get('artist_name')),
      genreName: atLeastOneOrUndefined(queryParams.get('genre')),
      minPrice: numberOrUndefined(queryParams.get('minPrice')),
      maxPrice: numberOrUndefined(queryParams.get('maxPrice')),
    },
  });

  const table = useReactTable({
    data: data?.getTracks.items ?? [],
    state: {
      columnFilters,
    },
    columns,
    initialState: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: data?.getTracks.pageInfo.totalPages ?? 1,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pagination = table.getState().pagination;

  useEffect(() => {
    const page = (pagination.pageIndex + 1).toString();
    const pageSize = pagination.pageSize.toString();

    if (
      queryParams.get('page') === page &&
      queryParams.get('pageSize') === pageSize
    ) {
      return;
    }

    queryParams.set('page', page);
    queryParams.set('pageSize', pageSize);

    navigate({ search: queryParams.toString() });
  }, [navigate, pagination.pageIndex, pagination.pageSize, queryParams]);

  return (
    <Grid
      templateAreas={`"header"
                    "data"
                    "footer"`}
      gridTemplateRows={'6rem 1fr 4rem'}
      gap="1"
      flexGrow={1}
      minH="100vh"
    >
      <GridItem
        area="header"
        as={Flex}
        alignItems="center"
        justifyItems="center"
        pl="4"
      >
        <Heading>Tracks</Heading>
      </GridItem>
      <GridItem area="data">
        <Table variant="striped" size="sm">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </GridItem>
      <GridItem area="footer" as={Center}>
        <Pagination
          pagination={pagination}
          pageCount={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          setPageIndex={table.setPageIndex}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          setPageSize={table.setPageSize}
        />
      </GridItem>
    </Grid>
  );
}
