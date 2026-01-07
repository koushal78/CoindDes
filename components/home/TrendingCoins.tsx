import { fetcher } from '@/lib/coingecko.action';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DataTable from '../DataTable';

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: '24h chnage',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
      return (
        <div
          className={cn(
            'price-chnage',
            isTrendingUp ? 'text-green-500' : 'text-red-500'
          )}
        >
          <p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
        </div>
      );
    },
  },
  {
    header: 'Price',
    cellClassName: 'Price-cell',
    cell: (coin) => coin.item.data.price,
  },
];

const TrendingCoins = async () => {
  const TrendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    '/search/trending',
    undefined,
    300
  );
  return (
    <>
      <div id="trending-coins">
        <h4>Trending Coins</h4>
       
          <DataTable
            data={TrendingCoins.coins.slice(0, 6) || []}
            columns={columns}
            rowKey={(row, index) => row.item.id}
            tableClassName="trending-coins-table"
            headerCellClassName="py-3!"
            bodyCellClassName="py-2!"
          />
        </div>
     
    </>
  );
};

export default TrendingCoins;
