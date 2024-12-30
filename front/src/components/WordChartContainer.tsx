import Image from 'next/image'
import WordChart from './WordChart'

const WordChartContainer = () => {
  return (
    <div className='h-full rounded-lg bg-white p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Words</h1>
        <Image src='/images/moreDark.png' alt='' width={20} height={20} />
      </div>
      <WordChart />
    </div>
  )
}

export default WordChartContainer
