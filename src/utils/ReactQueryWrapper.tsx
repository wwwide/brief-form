import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const ReactQueryWrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
