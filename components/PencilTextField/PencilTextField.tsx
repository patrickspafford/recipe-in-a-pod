import { ChangeEvent } from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core'
import { EditIcon, DoneIcon } from '../../icons'
import styles from './PencilTextField.module.css'
import { LoadingIndicator } from '..'

interface IPencilField {
  value: string
  id: string
  showPencil: boolean
  loading: boolean
  name?: string
  label?: string
  error: string
  setShowPencil: any
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  inputRef?: any
}

const PencilField = ({
  value,
  id,
  loading,
  setShowPencil,
  showPencil,
  name,
  label,
  error,
  onChange,
  inputRef,
}: IPencilField) => {
  const determineIcon = () => {
    if (loading) {
      return <LoadingIndicator size={25} />
    }
    return showPencil ? <EditIcon /> : <DoneIcon />
  }

  return (
    <div className={styles.tableStyle}>
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
          type="text"
          value={value}
          name={name}
          disableUnderline={error.length === 0}
          error={error.length > 0}
          onChange={(e) => !showPencil && onChange(e)}
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
                onClick={setShowPencil}
                disableFocusRipple
                style={{
                  marginRight: '1rem',
                  marginBottom: error ? '1rem' : '1.1rem',
                }}
              >
                {determineIcon()}
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

PencilField.defaultProps = {
  name: 'currentPassword',
  label: 'Password',
  inputRef: null,
}

export default PencilField
