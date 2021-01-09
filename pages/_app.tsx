// tslint:disable-next-line: no-import-side-effect
import '../styles/globals.css'
import { AuthProvider } from '../hooks/useAuth'
import { CookiesProvider } from 'react-cookie' 
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import colors from '../utils/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    }
  }
})

const SafeHydrate = ({ children }) => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </CookiesProvider>
    </SafeHydrate>
  )
}

export default MyApp
