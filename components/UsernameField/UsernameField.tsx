import { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import styles from './UsernameField.module.css'

interface IUsernameField {
    value: string
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    error: string
    id: string
    label?: string
    name?: string
    inputRef: any,
    autoFocus?: boolean
}

const UsernameField = ({
  value,
  onChange,
  error,
  id,
  label,
  name,
  inputRef,
  autoFocus,
}: IUsernameField) => (
  <div className={styles.tableStyle}>
    <TextField
      id={id}
      autoFocus={autoFocus}
      inputProps={{
        style: {
          marginLeft: '1rem',
        },
      }}
      name={name}
      className={styles.textField}
      type="text"
      InputLabelProps={{
        style: {
          marginLeft: '1rem',
        },
      }}
      FormHelperTextProps={{
        style: {
          marginLeft: '2rem',
        },
      }}
      variant="filled"
      label={label}
      error={error.length > 0}
      helperText={error}
      value={value}
      inputRef={inputRef}
      onChange={onChange}
    />
  </div>
)

UsernameField.defaultProps = {
  label: 'Username',
  name: 'username',
  autoFocus: false,
}

export default UsernameField
