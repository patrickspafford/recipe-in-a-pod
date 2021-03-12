import { useState, useEffect, useContext } from 'react'
import {
  Layout,
  Directions,
  Ingredients,
  RecipeTitle,
  Info,
  PhotoFrame,
  LoadingIndicator,
} from '../../../components'
import { PodType } from '../../../types'
import styles from '../../../styles/create.module.css'
import useWindowSize from '../../../hooks/useWindowSize'
import useUser from '../../../hooks/useUser'
import { ApiContext } from '../../../contexts/apiContext'

const Recipe = () => {
  // States Section
  const [pod, setPod] = useState<PodType>()
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState<number>(0)
  // Hooks
  const { isLarge, isSmall } = useWindowSize()
  const { apiService } = useContext(ApiContext)
  const { user, loggedIn } = useUser()
  useEffect(() => {
    const docId = window.location.pathname.split('recipes/')[1].split('/')[0]
    if (user && user.id) {
      apiService
        .getPod(user.id, docId)
        .then((fetchedPod: PodType) => {
          console.log(fetchedPod)
          setPod(fetchedPod)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          // setLoading(false)
        })
    }
  }, [loggedIn, user])

  return (
    <Layout title={pod ? pod.name : 'Loading...'}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10%',
            alignItems: 'center',
          }}
        >
          <LoadingIndicator size={160} />
        </div>
      ) : (
        <div className={isLarge ? styles.outerDivLarge : styles.outerDivSmall}>
          <div
            className={isLarge ? styles.innerDivLarge : styles.innerDivSmall}
          >
            <Ingredients editable={false} ingredients={pod.ingredients} />
            <Info price={pod.price} prepTime={pod.duration} editable={false} />
          </div>
          <div className={styles.directionsContainer}>
            <RecipeTitle editable={false}>{pod.name}</RecipeTitle>
            <div style={{ width: isSmall ? '100%' : '50%' }}>
              <PhotoFrame imageTarget={pod.photoLink} height={500} />
            </div>
            <Directions
              activeStep={activeStep}
              editable={false}
              steps={pod.instructions}
              setActiveStep={setActiveStep}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Recipe
