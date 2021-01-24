import { Typography as MuiTypography } from '@material-ui/core'

const Typography = ({ ...props }) => (
  <MuiTypography
    style={{
      color: 'white',
      padding: '0.5rem',
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

export default Typography
