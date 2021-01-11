import { TextField } from '@material-ui/core'
import { ChangeEvent } from 'react'
import styles from './EmailField.module.css'

interface IEmailField {
    value: string
    id: string
    name?: string
    label?: string
    error: string
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    inputRef: any
}
const EmailField = ({
  value,
  id,
  name,
  label,
  error,
  onChange,
  inputRef,
}: IEmailField) => (
  <div className={styles.tableStyle}>
    <TextField
      id={id}
      type="email"
      label={label}
      className={styles.textField}
      name={name}
      variant="filled"
      value={value}
      error={error.length > 0}
      helperText={error}
      onChange={onChange}
      inputRef={inputRef}
    />
  </div>
)

EmailField.defaultProps = {
  label: 'Email',
  name: 'email',
}

export default EmailField
