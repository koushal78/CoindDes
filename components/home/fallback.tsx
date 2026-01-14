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

export const CategoriesFallback = () => (
  <div className="bg-[#1a2026] rounded-lg py-4">
    <Skeleton className="h-6 w-32 mx-4 mb-4" />
    <div className="bg-[#1e2833] py-4 my-2">
      <ul className="grid grid-cols-5 px-4 text-[#9ba6cc] font-semibold">
        <li>Category</li>
        <li>Top Gainers</li>
        <li>24h Change</li>
        <li>Market Cap</li>
        <li>24h Volume</li>
      </ul>
    </div>
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="grid grid-cols-5 px-4 py-2 border-b border-b-gray-800">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-1">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-5 h-5 rounded-full" />
        </div>
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    ))}
  </div>
);
