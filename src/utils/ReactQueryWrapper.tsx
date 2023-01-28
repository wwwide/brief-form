import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryWrapperProps } from './ReactQueryWrapperProps'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export const ReactQueryWrapper: FC<ReactQueryWrapperProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
