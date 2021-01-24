import { Layout, IngredientTable, Directions } from '../../components'
import styles from '../../styles/recipe.module.css'

const Recipe = () => (
  <Layout title="My Pods">
    <div className={styles.ingredientDirectionsContainer}>
      <div className={styles.tableContainer}>
        <IngredientTable />
      </div>
      <div className={styles.directionsContainer}>
        <Directions />
      </div>
    </div>
  </Layout>
)

export default Recipe
