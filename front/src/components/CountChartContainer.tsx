import Image from 'next/image'
import CountChart from './CountChart'

const CountChartContainer = () => {
  return (
    <div className='h-full w-full rounded-xl bg-white p-4'>
      {/* TITLE */}
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Rooms</h1>
        <Image src='/images/moreDark.png' alt='' width={20} height={20} />
      </div>
      {/* CHART */}
      <CountChart />
      {/* BOTTOM */}
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className='h-5 w-5 rounded-full bg-customSky' />
          <h1 className='font-bold'>{1}</h1>
          <h2 className='text-xs text-gray-300'>
            Now Room ({Math.round((1 / (1 + 19)) * 100)}%)
          </h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='h-5 w-5 rounded-full bg-customYellow' />
          <h1 className='font-bold'>{19}</h1>
          <h2 className='text-xs text-gray-300'>
            Close Room ({Math.round((19 / (1 + 19)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CountChartContainer
