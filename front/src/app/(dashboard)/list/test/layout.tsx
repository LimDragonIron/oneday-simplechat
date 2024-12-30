import React from 'react'
import { SocketProvider } from '@/providers/SocketPovider'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>
}

export default ChatLayout
