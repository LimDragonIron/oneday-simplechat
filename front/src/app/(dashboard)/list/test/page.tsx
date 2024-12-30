'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSocket } from '@/providers/SocketPovider'

interface message {
  userId: number
  content: string
}

const ChatPage = () => {
  const [messages, setMessage] = useState<message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const { socket, isConnected } = useSocket()
  const [userId, setUserId] = useState(+new Date())

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on('message', (data: any) => {
      setMessage(messages => [...messages, ...[data]])
    })

    return () => {
      socket.off('message')
    }
  }, [socket, messages])

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await axios.post('/api/chat', {
      userId,
      content: currentMessage
    })
    setCurrentMessage('')
  }

  return (
    <div className='max-auto w-[300px] rounded-xl border shadow'>
      <div className='p-6'>
        <p>{isConnected ? '연결 완료' : '연결중'}</p>
      </div>
      <div className='p-6 pt-0'>
        <div className='space-y-4'>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                'flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 text-sm' +
                (msg.userId !== userId
                  ? 'ml-auto bg-blue-400 text-white'
                  : 'bg-zinc-100')
              }
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center p-6 pt-0'>
        <form>
          <input
            type='text'
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
            className='flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors'
          ></input>
          <button
            type='submit'
            onClick={e => {
              sendMessage(e)
            }}
            className='inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md bg-blue-600 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
          >
            보내기
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatPage
