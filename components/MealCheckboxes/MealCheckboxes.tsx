import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import colors from '../../utils/colors'

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
}: IMealCheckboxes) => (
  <FormGroup>
    <FormControlLabel
      control={
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

MealCheckboxes.defaultProps = {
  editable: true,
}

export default MealCheckboxes
