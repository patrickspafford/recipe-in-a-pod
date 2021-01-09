import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import colors from '../../utils/colors'

const IngredientTable = () => {

    const StyledTableContainer = withStyles({
        root: {
            width: '24rem'
        }
    })(TableContainer)

    const StyledTableCellHead = withStyles({
        root: {
            backgroundColor: colors.primary,
            color: 'white'
        }
    })(TableCell)

    const StyledTableCell = withStyles({
        root: {
            backgroundColor: colors.quinary,
            borderBottomColor: colors.primary,
            color: colors.primary,
        }
    })(TableCell)

    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('1 lb peeled, deveined shrimp from the ponds in the Himalayas', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

    return (
        <StyledTableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCellHead align='left'>Ingredient</StyledTableCellHead>
                        <StyledTableCellHead align='right'>Amount</StyledTableCellHead>
                        <StyledTableCellHead align='right'>Unit</StyledTableCellHead>
                        <StyledTableCellHead align="right">Calories</StyledTableCellHead>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align='right'>{row.calories}</StyledTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    )
}

export default IngredientTable