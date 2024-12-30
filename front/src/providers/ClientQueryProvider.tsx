'use client'
import { refreshAuthentication } from '@/services'
import { ClientDestroyCookies } from '@/utils/CookiesUtils'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React, { useState } from 'react'

const ClientQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache(),
        defaultOptions: {
          queries: {
            staleTime: 30000,
            retry: (_, error) => {
              if ((error as AxiosError).status === 401) {
                refreshAuthentication().then(() => {
                  queryClient.invalidateQueries()
                })
              }
              return false
            }
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ClientQueryProvider
