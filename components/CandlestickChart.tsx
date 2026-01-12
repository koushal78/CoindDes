'use client'

import {
  getCandlestickConfig,
  getChartConfig,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
} from '@/constants'
import { fetcher } from '@/lib/coingecko.action'
import { convertOHLCData } from '@/lib/utils'
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts'
import { useEffect, useRef, useState, useTransition } from 'react'

type CandlestickChartProps = {
  coinId: string
  height?: number
  initialPeriod?: Period
  children?: React.ReactNode
  data?: OHLCData[]
}

const CandlestickChart = ({
  coinId,
  height = 360,
  initialPeriod = 'daily',
  children,
  data = [],
}: CandlestickChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  const [period, setPeriod] = useState<Period>(initialPeriod)
  const [ohlcData, setOhlcData] = useState<any[]>(data)
  const [isPending, startTransition] = useTransition()

  /* ------------------ FETCH DATA ------------------ */
  const fetchOHLCData = async (selectedPeriod: Period) => {
    try {
      const config = PERIOD_CONFIG[selectedPeriod]

      const res = await fetcher<any[]>(
        `coins/${coinId}/ohlc`,
        {
          vs_currency: 'usd',
          days: config.days,
        },
        60
      )

      setOhlcData(res ?? [])
    } catch (err) {
      console.error('CoinGecko fetch failed:', err)
    }
  }

  /* ------------------ PERIOD CHANGE ------------------ */
  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return

    setPeriod(newPeriod)

    startTransition(() => {
      fetchOHLCData(newPeriod)
    })
  }

  /* ------------------ CHART INIT ------------------ */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Cleanup old chart
    if (chartRef.current) {
      chartRef.current.remove()
    }

    const showTime = ['daily', 'weekly', 'monthly'].includes(period)

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    })

    const series = chart.addSeries(
      CandlestickSeries,
      getCandlestickConfig()
    )

    series.setData(convertOHLCData(ohlcData))

    chart.timeScale().fitContent()

    chartRef.current = chart
    seriesRef.current = series

    /* Resize handling */
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries.length)return ; 
        chart.applyOptions({ width: entries[0].contentRect.width })
      
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null;
      seriesRef.current = null;
    }
  }, [ohlcData, height, period])


  useEffect(()=>{
    if(!seriesRef.current)return
    const convertedToSeconds = ohlcData.map((item)=>
      [Math.floor(item[0]/1000),item[1],item[2],item[3],item[4]] as OHLCData,
    )

    const converted = convertOHLCData(convertedToSeconds);
    seriesRef.current.setData(converted);
    chartRef.current?.timeScale().fitContent();
  },[ohlcData,period])
  return (
    <div id="candlestick-chart">
      <div className="chart-header flex items-center justify-between mb-2">
        <div className="flex-1">{children}</div>

        <div className="button-group flex items-center gap-2">
          <span className="text-sm text-purple-100/50">
            Period:
          </span>

          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handlePeriodChange(value)}
              className={
                period === value
                  ? 'config-button-active'
                  : 'config-button'
              }
              disabled={isPending}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="chart"
        style={{ height }}
      />
    </div>
  )
}

export default CandlestickChart
