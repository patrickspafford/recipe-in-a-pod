/* eslint-disable react/jsx-props-no-spreading */
// tslint:disable-next-line: no-import-side-effect
import '../styles/globals.css'
import { ReactNode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { AuthProvider } from '../hooks/useAuth'
import { ProfilePhotoProvider } from '../contexts/ProfilePhotoContext'
import colors from '../utils/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
  },
})

interface ISafeHydrate {
  children: ReactNode
}

const SafeHydrate = ({ children }: ISafeHydrate) => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

interface IMyApp {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: IMyApp) {
  return (
    <SafeHydrate>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <ProfilePhotoProvider>
              <Component {...pageProps} />
            </ProfilePhotoProvider>
          </AuthProvider>
        </ThemeProvider>
      </CookiesProvider>
    </SafeHydrate>
  )
}

export default MyApp
