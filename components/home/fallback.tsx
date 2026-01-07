import DataTable from '@/components/DataTable';
import { cn } from '@/lib/utils';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse bg-gray-400 rounded', className)} />
);

export const CoinOverviewFallback = () => (
  <div id="coin-overview-fallback" className="bg-dark-500 rounded-xl p-4">
    <div className="header pt-2 flex gap-3">
      <div className="header-image w-14 h-14 rounded-full bg-gray-400 animate-pulse" />
      <div className="info flex flex-col gap-2">
        <div className="header-line-sm h-3 w-28 bg-gray-400 rounded animate-pulse" />
        <div className="header-line-lg h-7 w-44 bg-gray-400 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const skeletonColumns: DataTableColumn<{ id: number }>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: () => (
      <div className="name-link">
        <Skeleton className="name-image" />
        <Skeleton className="name-line" />
      </div>
    ),
  },
  {
    header: '24h change',
    cellClassName: 'change-cell',
    cell: () => (
      <div className="price-change">
        <Skeleton className="change-icon" />
        <Skeleton className="change-line" />
      </div>
    ),
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: () => <Skeleton className="price-line" />,
  },
];

const skeletonData = Array.from({ length: 4 }, (_, i) => ({ id: i }));

export const TrendingCoinsFallback = () => (
  <div id="trending-coins-fallback">
    <h4>Trending Coins</h4>
    <div className="trending-coins-table">
      <DataTable
        data={skeletonData}
        columns={skeletonColumns}
        rowKey={(row) => row.id}
      />
    </div>
  </div>
);
