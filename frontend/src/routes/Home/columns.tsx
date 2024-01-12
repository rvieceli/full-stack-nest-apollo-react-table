import { createColumnHelper } from '@tanstack/react-table';
import { Track } from '../../lib/gql/graphql';
import { headerWithSearchAsStringHelper } from '../../components/SearchInput';
import { formatCurrencyWithoutSymbol } from '../../utils/formatCurrency';
import { headerWithMinMaxFilterHelper } from '../../components/MinMaxInput';
import { humanizeMinutes } from '../../utils/humanizeMinutes';

const columnHelper = createColumnHelper<Track>();

export const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('artist.name', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: headerWithSearchAsStringHelper,
  }),
  columnHelper.accessor('genre', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: headerWithSearchAsStringHelper,
  }),
  columnHelper.accessor('price', {
    cell: (info) => formatCurrencyWithoutSymbol(info.getValue()),
    footer: (info) => info.column.id,
    header: headerWithMinMaxFilterHelper,
  }),
  columnHelper.accessor('duration', {
    cell: (info) => humanizeMinutes(info.getValue()),
    footer: (info) => info.column.id,
  }),
];
