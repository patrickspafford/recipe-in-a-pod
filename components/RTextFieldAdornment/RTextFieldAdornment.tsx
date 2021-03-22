export {}
/*
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core'
import { EditIcon } from '../../icons'
import { TextFieldChange } from '../../types'

interface IRTextFieldAdornment {
  value: string
  id: string
  showValue: boolean
  name?: string
  label?: string
  error: string
  setShowValue: any
  // eslint-disable-next-line no-unused-vars
  onChange: (event: TextFieldChange) => void
  inputRef?: any
}

const RTextFieldAdornment = ({
  value,
  id,
  setShowValue,
  showValue,
  name,
  label,
  error,
  onChange,
  inputRef,
  inputStyles,
  formControlStyles,
  adornmentStyles,
}: IRTextFieldAdornment) => (
  <FormControl
    style={{ backgroundColor: '#fff' }}
    className={formControlStyles}
  >
    <InputLabel
      htmlFor={id}
      error={error.length > 0}
      variant="filled"
      style={{
        marginLeft: '1rem',
      }}
    >
      {label}
    </InputLabel>
    <Input
      id={id}
      className={inputStyles}
      type={showValue ? 'text' : 'password'}
      value={value}
      name={name}
      disableUnderline={error.length === 0}
      error={error.length > 0}
      onChange={onChange}
      style={{
        marginLeft: '1rem',
      }}
      inputRef={inputRef}
      inputProps={{
        'aria-autocomplete': 'none',
        autoComplete: 'off',
      }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={setShowValue}
            disableFocusRipple
            style={adornmentStyles}
          >
            {showValue ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
    <FormHelperText
      error={error.length > 0}
      variant="filled"
      style={{
        marginLeft: '2rem',
      }}
    >
      {error}
    </FormHelperText>
  </FormControl>
)

RTextFieldAdornment.defaultProps = {
  name: 'currentPassword',
  label: 'Password',
  inputRef: null,
}

export default RTextFieldAdornment
*/
