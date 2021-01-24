/* eslint-disable react/jsx-props-no-spreading */
// tslint:disable-next-line: no-import-side-effect
import '../styles/globals.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ApiProvider } from '../contexts/apiContext'
import colors from '../utils/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
  },
})

interface IMyApp {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: IMyApp) {
  return (
    <ApiProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApiProvider>
  )
}

export default MyApp
