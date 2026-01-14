import { fetcher } from "@/lib/coingecko.action"
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";


const Categories = async() => {
    let categories = await fetcher<Category[]>('coins/categories')
    categories = categories.slice(0,10);
  return (
    <div className="bg-[#1a2026] rounded-lg py-4  ">
        <h1 className="text-xl font-semibold px-4">Top Categories</h1>
        <div className="">
            <div className="bg-[#1e2833] py-4 my-2">
                <ul className="grid grid-cols-5 px-4 text-[#9ba6cc] font-semibold ">
                    <li>Category</li>
                    <li> Top Gainers</li>
                    <li> 24h Change</li>
                    <li>Market Cap</li>
                    <li>24h Volume</li>
                </ul>
                </div>
                {
                    categories.map((coin,id)=>(
                        <ul key={id} className="grid grid-cols-5 px-4 space-y-4 items-center border-b hover:bg-[#1a212a] border-b-gray-800 py-2">
                            <li className="text-sm font-medium ">{coin.name}</li>
                            <li className="flex gap-1">
                                {coin.top_3_coins.map((img,idx)=>(
                                    <div key={idx} className="">
                                        <Image src={img} alt="top gains" width={20} height={20}/>

                                    </div>
                                ))}
                            </li>
                          <li
  className={coin.market_cap_change_24h < 0 ? 'text-red-700' : 'text-green-600'}
>
  {coin.market_cap_change_24h.toFixed(2)}%
  {coin.market_cap_change_24h < 0 ? (
    <TrendingDown className="inline ml-1" color="red" size={16} />
  ) : (
    <TrendingUp className="inline ml-1" color="green" size={16} />
  )}
</li>
                            <li>{coin.market_cap}</li>
                            <li>${coin.volume_24h}</li>
                        </ul>
                    ))
                }
        </div>

        
    </div>
  )
}

export default Categories