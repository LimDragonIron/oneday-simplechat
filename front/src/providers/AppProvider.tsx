'use client'

import ClientQueryProvider from './ClientQueryProvider'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClientQueryProvider>{children}</ClientQueryProvider>
}

export default AppProvider
