import { useState } from 'react'
import {
  Layout,
  Directions,
  Ingredients,
  RecipeTitle,
  Info,
  PhotoFrame,
} from '../../components'
import { PodType } from '../../types'
import styles from '../../styles/create.module.css'
import useWindowSize from '../../hooks/useWindowSize'

interface IRecipe {
  pod: PodType
}

const Recipe = ({ pod }: IRecipe) => {
  // Hooks
  const { isLarge, isSmall } = useWindowSize()
  // States Section
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <Layout title="Create a Pod">
      <div className={isLarge ? styles.outerDivLarge : styles.outerDivSmall}>
        <div className={isLarge ? styles.innerDivLarge : styles.innerDivSmall}>
          <Ingredients ingredients={pod.ingredients} />
          {/* <Info price={pod.price} prepTime={pod.duration} /> */}
        </div>
        <div className={styles.directionsContainer}>
          {/* <RecipeTitle>{pod.name}</RecipeTitle>
          <div
            style={{
              width: isSmall ? '100%' : '50%',
            }}
          >
            <PhotoFrame imageTarget={pod.photoLink} height={500} />
          </div>
          <Directions
            activeStep={activeStep}
            steps={pod.instructions}
            setActiveStep={setActiveStep}
          />
        </div>
          */}
        </div>
      </div>
    </Layout>
  )
}

export default Recipe
