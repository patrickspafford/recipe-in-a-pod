import { TextField } from '@material-ui/core'
import { Ref, ChangeEvent, CSSProperties } from 'react'
import { AddIcon, DeleteIcon } from '../../icons'
import { IconButton } from '../../components'
import colors from '../../utils/colors'

interface IIngredientTextField {
  inputRef?: Ref<HTMLInputElement>
  children: string
  placeholder: string
  addButton?: boolean
  deleteButton?: boolean
  onDeleteClicked?: any
  onButtonClicked?: any
  error?: string
  isAlternate: boolean
  disabled?: boolean
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  containerStyles?: CSSProperties
}
const IngredientTextField = ({
  inputRef,
  onChange,
  isAlternate,
  error,
  children,
  placeholder,
  addButton,
  disabled,
  onButtonClicked,
  deleteButton,
  onDeleteClicked,
  containerStyles,
}: IIngredientTextField) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isAlternate ? colors.quinary : colors.white,
      borderRadius: '1rem',
      ...containerStyles,
    }}
  >
    <TextField
      variant="standard"
      style={{
        marginLeft: '1rem',
        padding: '0.5rem',
      }}
      value={children}
      fullWidth
      disabled={disabled}
      error={error.length > 0}
      helperText={!!error && error}
      placeholder={placeholder}
      InputProps={{
        disableUnderline: true,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        style: {
          color: colors.black,
          lineHeight: '2rem',
        },
        'aria-readonly': disabled,
        readOnly: disabled,
      }}
      inputRef={inputRef}
      onChange={onChange}
    />
    {deleteButton && (
      <IconButton onClick={onDeleteClicked} disableFocusRipple>
        <DeleteIcon style={{ color: colors.primary }} />
      </IconButton>
    )}
    {addButton && (
      <IconButton onClick={onButtonClicked} disableFocusRipple>
        <AddIcon style={{ color: colors.primary }} />
      </IconButton>
    )}
  </div>
)

IngredientTextField.defaultProps = {
  inputRef: null,
  addButton: false,
  deleteButton: false,
  error: '',
  containerStyles: {},
  disabled: false,
  onDeleteClicked: () => console.warn('On Delete Clicked Not Init.'),
  onButtonClicked: () => console.warn('On Button Clicked Not Init.'),
}

export default IngredientTextField
