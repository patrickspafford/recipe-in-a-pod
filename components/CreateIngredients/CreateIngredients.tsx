import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid'
import {
  IngredientTextField,
} from '../../components'
import { Ingredient } from '../../types'
import colors from '../../utils/colors'

const uuids = new Array(101)
uuids.map(() => uuidv4())

const StyledTableCellHead = withStyles({
  root: {
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    padding: '12px',
  },
})(TableCell)

const StyledTableCell = withStyles({
  root: {
    backgroundColor: colors.primary,
    border: `1px solid ${colors.primary}`,
    padding: '10px',
  },
})(TableCell)

const StyledTableRowHead = withStyles({
  root: {
    border: 'none',
  },
})(TableRow)

const StyledTableRow = withStyles({
  root: {
    border: 'none',
    marginBottom: '1rem',
  },
})(TableRow)

interface IIngredientTable {
  ingredients: Ingredient[]
  newIngredient: Ingredient,
  handleSetNewIngredient: any,
  handleSetIngredient: any,
  handleAddIngredient: any,
  handleDeleteIngredient: any,
}

const IngredientTable = ({
  ingredients,
  newIngredient,
  handleSetNewIngredient,
  handleSetIngredient,
  handleAddIngredient,
  handleDeleteIngredient,
}: IIngredientTable) => (
  <TableContainer
    style={{
      borderRadius: '2rem',
      marginTop: '2rem',
      border: `1px solid ${colors.quinary}`,
    }}
  >
    <Table aria-label="simple table" stickyHeader>
      <TableHead>
        <StyledTableRowHead>
          <StyledTableCellHead align="center">Ingredient</StyledTableCellHead>
          <StyledTableCellHead align="center">Amount</StyledTableCellHead>
        </StyledTableRowHead>
      </TableHead>
      <TableBody>
        {ingredients.map((ingredient, index) => (
          <StyledTableRow hover key={uuids[index]}>
            <StyledTableCell align="center" component="th" scope="row">
              <IngredientTextField
                onChange={(e) => handleSetIngredient(e, index, 'name')}
                placeholder="Ingredient"
                error={ingredient.error.name}
              >
                {ingredient.name}
              </IngredientTextField>
            </StyledTableCell>
            <StyledTableCell align="center">
              <IngredientTextField
                onChange={(e) => handleSetIngredient(e, index, 'amount')}
                placeholder="Amount"
                error={ingredient.error.amount}
                deleteButton
                onDeleteClicked={() => handleDeleteIngredient(index)}
              >
                {ingredient.amount}
              </IngredientTextField>
            </StyledTableCell>
          </StyledTableRow>
        ))}
        <StyledTableRow hover key="add-new-ingredient">
          <StyledTableCell align="center" component="th" scope="row">
            <IngredientTextField
              onChange={(e) => handleSetNewIngredient(e, 'name')}
              placeholder="New Ingredient"
              error={newIngredient.error.name}
            >
              {newIngredient.name}
            </IngredientTextField>
          </StyledTableCell>
          <StyledTableCell align="center">
            <IngredientTextField
              onChange={(e) => handleSetNewIngredient(e, 'amount')}
              placeholder="New Ingredient Amount"
              error={newIngredient.error.amount}
              addButton
              onButtonClicked={handleAddIngredient}
            >
              {newIngredient.amount}
            </IngredientTextField>
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  </TableContainer>
)

export default IngredientTable
