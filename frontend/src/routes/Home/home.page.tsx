import { useQuery } from '@apollo/client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { document } from './document.graphql';
import { Track } from '../../lib/gql/graphql';
import {
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Pagination } from '../../components/Pagination';
import { humanizeMinutes } from '../../utils/humanizeMinutes';
import { formatCurrencyWithoutSymbol } from '../../utils/formatCurrency';

const columnHelper = createColumnHelper<Track>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('genre', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    cell: (info) => formatCurrencyWithoutSymbol(info.getValue()),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('duration', {
    cell: (info) => humanizeMinutes(info.getValue()),
    footer: (info) => info.column.id,
  }),
];

export function HomePage() {
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
    },
  });

  const table = useReactTable({
    data: data?.getTracks.items ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: data?.getTracks.pageInfo.totalPages ?? 1,

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
    <div>
      <Flex p="4">
        <Heading>Tracks</Heading>
      </Flex>
      <Table variant="striped" colorScheme="blue" size="sm">
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
        <Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <Tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>

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
    </div>
  );
}
