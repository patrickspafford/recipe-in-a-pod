import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import colors from '../../utils/colors'
import useWindowSize from '../../hooks/useWindowSize'

interface IMealCheckboxes {
  firstLabel: string
  secondLabel: string
  thirdLabel: string
  firstChecked: boolean
  secondChecked: boolean
  thirdChecked: boolean
  handleFirstChange: any
  handleSecondChange: any
  handleThirdChange: any
  editable?: boolean
}

const MealCheckboxes = ({
  firstLabel,
  secondLabel,
  thirdLabel,
  firstChecked,
  secondChecked,
  thirdChecked,
  handleFirstChange,
  handleSecondChange,
  handleThirdChange,
  editable,
}: IMealCheckboxes) => {
  const { isSmall } = useWindowSize()
  return (
    <FormGroup style={isSmall ? { margin: 'auto' } : {}}>
      <FormControlLabel
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox
            checked={firstChecked}
            onChange={(e) => {
              if (editable) {
                handleFirstChange(e)
              }
            }}
            name={firstLabel}
          />
        }
        style={{ color: colors.white }}
        label={firstLabel}
      />
      <FormControlLabel
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox
            checked={secondChecked}
            onChange={(e) => {
              if (editable) {
                handleSecondChange(e)
              }
            }}
            name={secondLabel}
          />
        }
        style={{ color: colors.white }}
        label={secondLabel}
      />
      <FormControlLabel
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox
            checked={thirdChecked}
            onChange={(e) => {
              if (editable) {
                handleThirdChange(e)
              }
            }}
            name={thirdLabel}
          />
        }
        style={{ color: colors.white }}
        label={thirdLabel}
      />
    </FormGroup>
  )
}

MealCheckboxes.defaultProps = {
  editable: true,
}

export default MealCheckboxes
