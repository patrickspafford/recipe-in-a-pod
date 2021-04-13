import { Switch as MuiSwitch, ThemeProvider } from '@material-ui/core'
import { ReactNode } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { Typography } from '../../components'
import useWindowSize from '../../hooks/useWindowSize'
import colors from '../../utils/colors'

interface ISwitch {
  checked: boolean
  onChange: any
  editable: boolean
  leftIcon: ReactNode
  leftLabel: string
  rightLabel: string
  rightIcon: ReactNode
  name: string
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.white,
    },
    secondary: {
      main: colors.quinary,
    },
  },
})

const Switch = ({
  checked,
  onChange,
  editable,
  name,
  leftIcon,
  rightIcon,
  leftLabel,
  rightLabel,
}: ISwitch) => {
  const { isLarge } = useWindowSize()

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <span
          style={{
            backgroundColor: colors.primary,
            padding: '1rem',
            borderRadius: '2rem',
            width: isLarge ? '50%' : '90%',
            display: 'flex',
            margin: 'auto',
            justifyContent: 'center',
            border: `2px solid ${colors.quinary}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: checked ? 0.5 : 1.0,
            }}
          >
            {leftIcon}
            <Typography>{leftLabel}</Typography>
          </div>
          <MuiSwitch
            checked={checked}
            disabled={!editable}
            onChange={onChange}
            name={name}
            inputProps={{ 'aria-label': `toggle ${name}` }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: checked ? 1.0 : 0.5,
            }}
          >
            {rightIcon}
            <Typography>{rightLabel}</Typography>
          </div>
        </span>
      </div>
    </ThemeProvider>
  )
}

export default Switch
