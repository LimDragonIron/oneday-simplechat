import CountCard from '@/components/CountCard'
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import FinanceChart from '@/components/FinanceChart'
import WordChartContainer from '@/components/WordChartContainer'

export interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      {/* LEFT */}
      <div className='flex w-full flex-col gap-8 lg:w-2/3'>
        {/* USER CARDS */}
        <div className='flex flex-wrap justify-between gap-4'>
          <CountCard />
          <CountCard />
        </div>
        {/* MIDDLE CHARTS */}
        <div className='flex flex-col gap-4 lg:flex-row'>
          {/* COUNT CHART */}
          <div className='h-[450px] w-full lg:w-1/3'>
            <CountChartContainer />
          </div>
          {/* ATTENDANCE CHART */}
          <div className='h-[450px] w-full lg:w-2/3'>
            <WordChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className='h-[500px] w-full'>
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className='flex w-full flex-col gap-8 lg:w-1/3'>
        <EventCalendarContainer />
        {/*<Announcements /> */}
      </div>
    </div>
  )
}

export default MainPage
