import Image from 'next/image'
import EventCalendar from './EvnetCalendar'
import EventList from './EventList'
import { EventPayload } from '@/models'


const mockData: EventPayload[] = [
  {
    id: 1,
    title:" Sample-1",
    description: "첫번째 이벤트입니다.",
    startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
    endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
  },
  {
    id: 2,
    title:" Sample-2",
    description: "두번째 이벤트입니다.",
    startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
    endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
  },
]

const EventCalendarContainer = () => {
  return (
    <div className='rounded-md bg-white p-4'>
      <EventCalendar />
      <div className='flex items-center justify-between'>
        <h1 className='my-4 text-xl font-semibold'>Events</h1>
        <Image src='/images/moreDark.png' alt='' width={20} height={20} />
      </div>
      <div className='flex flex-col gap-4'>
        <EventList events={mockData} />
      </div>
    </div>
  )
}

export default EventCalendarContainer
