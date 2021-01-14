import { useContext, createContext, useState } from 'react'

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
})

const AuthProvider = ({ children, authenticated }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(authenticated)

    return (
        <AuthContext.Provider
        value={{
            isAuthenticated,
            setAuthenticated,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvder.')
    }
    return context
}

export const useIsAuthenticated = () => {
    const context = useAuth()
    return context.isAuthenticated
}