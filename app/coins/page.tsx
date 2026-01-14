

import CoinPagination from '@/components/CoinPagination'
import DataTable from '@/components/DataTable'
import { fetcher } from '@/lib/coingecko.action'
import Image from 'next/image'
import Link from 'next/link'



/* ================= TABLE COLUMNS ================= */

const columns: DataTableColumn<CoinMarketData>[] = [
  {
    header: 'Rank',
    cellClassName: 'rank-cell',
    cell: (coin) => <p>{coin.market_cap_rank}</p>,
  },
  {
    header: 'Token',
    cellClassName: 'token-cell',
    cell: (coin) => (
      <Link href={`/coin/${coin.id}`} className="flex items-center gap-2">
        <Image
          src={coin.image}
          alt={coin.name}
          width={20}
          height={20}
        />
        <p>{coin.name}</p>
      </Link>
    ),
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => (
      <p>${coin.current_price.toLocaleString()}</p>
    ),
  },
  {
    header: '24h Change',
    cellClassName: 'change-cell',
    cell: (coin) => (
      
      <p
        className={`${
          
coin.price_change_percentage_24h < 0
            ? 'text-red-700'
            : 'text-green-700'}
            `
          
        }
            
        
      >
        { coin.price_change_percentage_24h !== null ? coin.price_change_percentage_24h.toFixed(2)+ '%' :'__' }
      </p>
    ),
  },
  {
    header: 'Market Cap',
    cellClassName: 'market-cap-cell',
    cell: (coin) => (
      <p>${coin.market_cap.toLocaleString()}</p>
    ),
  },
]

/* ================= PAGE ================= */

const Page = async ({searchParams}:NextPageProps) => {
  const perPage = 10;
  const {page} = await searchParams
  const currentPage = Number(page)|| 1;


  const allCoins = await fetcher<CoinMarketData[]>(
    'coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: perPage,
    page: currentPage,
    sparkline: 'false',
    price_change_percentage: '24h',
  }
  )

  const hasMorePages = allCoins.length === perPage
    const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

 

  return (

    <main  id="coins-page" >

    <div className="content">
      <h4>All Coins</h4>

    


      <DataTable 
        data={allCoins.slice(0, 10)}
        columns={columns}
        rowKey={(row) => row.id}
        tableClassName="coins-page"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
        />
       
     <CoinPagination
         currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
     />
    </div>
        </main>
  )
}

export default Page
