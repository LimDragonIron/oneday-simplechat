'use client'

import React, { useEffect, useRef, useState } from 'react'
import { EventPayload } from '@/models'

export interface EventListProps {
  events: EventPayload[]
}

const EventList = ({ events }: EventListProps) => {
  return events.map(event => (
    <div
      className='rounded-md border-2 border-t-4 border-gray-100 p-5 odd:border-t-customSky even:border-t-customPurple'
      key={event.id}
    >
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-gray-600'>{event.title}</h1>
        <span className='text-xs text-gray-300'>
          {event.startTime.toLocaleTimeString('en-UK', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </span>
      </div>
      <p className='mt-2 text-sm text-gray-400'>{event.description}</p>
    </div>
  ))
}

export default EventList
