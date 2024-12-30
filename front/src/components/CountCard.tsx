import Image from 'next/image'
export interface CountCardProps {}
const CountCard = () => {
  return (
    <div className='min-w-[130px] flex-1 rounded-2xl p-4 odd:bg-customPurple even:bg-customYellow'>
      <div className='flex items-center justify-between'>
        <span className='rounded-full bg-white px-2 py-1 text-[10px] text-green-600'>
          2024/25
        </span>
        <Image src='/images/more.png' alt='' width={20} height={20} />
      </div>
      <h1 className='my-4 text-2xl font-semibold'>{'10'}</h1>
      <h2 className='text-sm font-medium capitalize text-gray-500'>{'Test'}</h2>
    </div>
  )
}

export default CountCard
