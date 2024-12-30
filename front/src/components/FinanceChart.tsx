'use client'

import Image from 'next/image'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const data = [
  {
    name: 'Jan',
    totalTokens: 2567,
    promptTokens: 1789,
    completionTokens: 3856
  },
  {
    name: 'Feb',
    totalTokens: 3212,
    promptTokens: 2145,
    completionTokens: 4357
  },
  {
    name: 'Mar',
    totalTokens: 2890,
    promptTokens: 1934,
    completionTokens: 3826
  },
  {
    name: 'Apr',
    totalTokens: 3456,
    promptTokens: 2304,
    completionTokens: 4760
  },
  {
    name: 'May',
    totalTokens: 2789,
    promptTokens: 1867,
    completionTokens: 3656
  },
  {
    name: 'Jun',
    totalTokens: 3123,
    promptTokens: 2082,
    completionTokens: 4165
  },
  {
    name: 'Jul',
    totalTokens: 2987,
    promptTokens: 1991,
    completionTokens: 3983
  },
  {
    name: 'Aug',
    totalTokens: 3345,
    promptTokens: 2230,
    completionTokens: 4475
  },
  {
    name: 'Sep',
    totalTokens: 2678,
    promptTokens: 1785,
    completionTokens: 3463
  },
  {
    name: 'Oct',
    totalTokens: 3012,
    promptTokens: 2008,
    completionTokens: 4016
  },
  {
    name: 'Nov',
    totalTokens: 2856,
    promptTokens: 1904,
    completionTokens: 3760
  },
  {
    name: 'Dec',
    totalTokens: 3234,
    promptTokens: 2156,
    completionTokens: 4390
  }
]

const FinanceChart = () => {
  return (
    <div className='h-full w-full rounded-xl bg-white p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Finance</h1>
        <Image src='/images/moreDark.png' alt='' width={20} height={20} />
      </div>
      <ResponsiveContainer width='100%' height='90%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#ddd' />
          <XAxis
            dataKey='name'
            axisLine={false}
            tick={{ fill: '#d1d5db' }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: '#d1d5db' }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align='center'
            verticalAlign='top'
            wrapperStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
          />
          <Line
            type='monotone'
            dataKey='totalTokens'
            stroke='#8DC77B'
            strokeWidth={5}
          />
          <Line
            type='monotone'
            dataKey='promptTokens'
            stroke='#CFCEFF'
            strokeWidth={5}
          />
          <Line
            type='monotone'
            dataKey='completionTokens'
            stroke='#C3EBFA'
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FinanceChart
