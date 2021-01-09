import { Layout, IngredientTable, Directions } from '../../components'
import Image from 'next/image'
import styles from '../../styles/recipe.module.css'

const Home = () => (
  <Layout title='My Pods' >
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

export default Home
