import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Pagination } from '../../components/Pagination';

import { columns } from './columns';
import { usePagination } from '../../hooks/usePagination';
import { useTracksData } from './useTracksData';
import { useGetFromCssMap } from '../../hooks/useGetFromCssMap';

export function HomePage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageIndex, pageSize] = usePagination();
  const data = useTracksData();
  const backgroundColor = useGetFromCssMap('colors.chakra-body-bg');

  const table = useReactTable({
    data: data?.getTracks.items ?? [],
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    columns,
    manualPagination: true,
    pageCount: data?.getTracks.pageInfo.totalPages ?? 1,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Grid
      templateAreas={`"header"
                    "data"
                    "footer"`}
      gridTemplateRows={'6rem 1fr 4rem'}
      gap="1"
      flexGrow={1}
      minH="100vh"
      maxH="100vh"
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
      <GridItem area="data" as={TableContainer} overflowY="auto">
        <Table variant="striped" size="sm" position="relative">
          <Thead position="sticky" top={0} boxShadow="lg" bg={backgroundColor}>
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
          pageCount={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
        />
      </GridItem>
    </Grid>
  );
}
