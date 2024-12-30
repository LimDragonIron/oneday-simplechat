'use client'
import Image from 'next/image'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

export interface CountChartProps {}

const CountChart = () => {
  const data = [
    {
      name: 'Total',
      count: 20,
      fill: 'white'
    },
    {
      name: 'Now Room',
      count: 1,
      fill: '#FAE27C'
    },
    {
      name: 'Close Room',
      count: 19,
      fill: '#C3EBFA'
    }
  ]
  return (
    <div className='relative h-[75%] w-full'>
      <ResponsiveContainer>
        <RadialBarChart
          cx='50%'
          cy='50%'
          innerRadius='40%'
          outerRadius='100%'
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey='count' />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src='/images/chat.png'
        alt=''
        width={50}
        height={50}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  )
}

export default CountChart
