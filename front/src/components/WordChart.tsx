'use client'

import { PureComponent } from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'


class CustomizedContent extends PureComponent {
  render() {
    // @ts-ignore
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : '#ffffff00',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10)
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor='middle'
            fill='#fff'
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill='#fff'
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    )
  }
}

const COLORS = [
  '#8889DD',
  '#9597E4',
  '#8DC77B',
  '#A5D297',
  '#E2CF45',
  '#F8C12D'
]
const WordChart = () => {
  const data = [
    {
      name: '인사말',
      children: [
        {
          name: '안녕',
          size: 24593
        },
        {
          name: 'HI',
          size: 1302
        },
        {
          name: 'ㅎㅇ',
          size: 652
        },
        {
          name: '안녕하세요.',
          size: 636
        },
        {
          name: '반갑습니다.',
          size: 6703
        }
      ]
    },
    {
      name: '욕설',
      children: [
        {
          name: '안녕',
          size: 8435
        },
        {
          name: 'HI',
          size: 7862
        },
        {
          name: 'ㅎㅇ',
          size: 5222
        },
        {
          name: '안녕하세요.',
          size: 4896
        },
        {
          name: '반갑습니다.',
          size: 4665
        }
      ]
    },
    {
      name: '이름',
      children: [
        {
          name: '안녕',
          size: 24593
        },
        {
          name: 'HI',
          size: 1302
        },
        {
          name: 'ㅎㅇ',
          size: 652
        },
        {
          name: '안녕하세요.',
          size: 636
        },
        {
          name: '반갑습니다.',
          size: 6703
        }
      ]
    }
  ]
  return (
    <ResponsiveContainer width='100%' height='90%'>
      <Treemap
        width={500}
        height={300}
        data={data}
        dataKey='size'
        aspectRatio={4 / 3}
        stroke='#fff'
        fill='#8884d8'
        content={
          <CustomizedContent
            // @ts-ignore
            colors={COLORS}
          />
        }
      />
    </ResponsiveContainer>
  )
}

export default WordChart
