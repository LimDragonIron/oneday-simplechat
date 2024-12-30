'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const EventCalendar = () => {
  const [value, onChange] = useState<Value>()
  const router = useRouter()

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`)
    }
  }, [value, router])

  return <Calendar locale='ko' onChange={onChange} value={value} />
}

export default EventCalendar
