/* eslint-disable react/jsx-wrap-multilines */
import { ChangeEvent } from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import styles from './PasswordField.module.css'
import useWindowSize from '../../hooks/useWindowSize'

interface IPasswordField {
  value: string
  id: string
  showPassword: boolean
  name?: string
  label?: string
  error: string
  setShowPassword: any
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  inputRef?: any
}

const PasswordField = ({
  value,
  id,
  setShowPassword,
  showPassword,
  name,
  label,
  error,
  onChange,
  inputRef,
}: IPasswordField) => {
  const { isLarge } = useWindowSize()

  return (
    <div className={isLarge ? styles.tableStyle : styles.smallTableStyle}>
      <FormControl
        style={{ backgroundColor: '#fff' }}
        className={styles.formControl}
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
          className={styles.textField}
          type={showPassword ? 'text' : 'password'}
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
                onClick={setShowPassword}
                disableFocusRipple
                style={{
                  marginRight: '1rem',
                  marginBottom: error ? '1rem' : '1.1rem',
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
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
    </div>
  )
}

PasswordField.defaultProps = {
  name: 'currentPassword',
  label: 'Password',
  inputRef: null,
}

export default PasswordField
