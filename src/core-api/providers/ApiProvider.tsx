import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { dictionaryService } from '../services/dictionaryService'

interface ApiContextType {
  dictionaryService: typeof dictionaryService
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export function ApiProvider({ children }: { children: ReactNode }) {
  const value = {
    dictionaryService,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export function useApi() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
