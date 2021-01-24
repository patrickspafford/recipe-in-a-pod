import { createContext, ReactNode } from 'react'
import ApiService from '../services/ApiService'

const contextDefaultValue = {
  apiService: new ApiService(),
}

export const ApiContext = createContext(contextDefaultValue)
interface IApiProvider {
    children: ReactNode
}

export const ApiProvider = ({ children }: IApiProvider) => (
  <ApiContext.Provider value={contextDefaultValue}>
    {children}
  </ApiContext.Provider>
)
