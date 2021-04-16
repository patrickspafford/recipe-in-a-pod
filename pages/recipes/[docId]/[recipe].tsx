import { useState, useEffect, useContext } from 'react'
import { GetServerSideProps } from 'next'
import {
  Layout,
  Directions,
  Ingredients,
  RecipeTitle,
  Info,
  PhotoFrame,
  LoadingContent,
} from '../../../components'
import { withAuth } from '../../../hoc'
import { PodType } from '../../../types'
import styles from '../../../styles/create.module.css'
import useWindowSize from '../../../hooks/useWindowSize'
import useUser from '../../../hooks/useUser'
import { ApiContext } from '../../../contexts/apiContext'

interface IRecipe {
  podDocId: string
}

const Recipe = ({ podDocId }: IRecipe) => {
  // States Section
  const [pod, setPod] = useState<PodType>()
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState<number>(0)
  // Hooks
  const { isLarge, isSmall, isTiny } = useWindowSize()
  const { apiService } = useContext(ApiContext)
  const { user, loggedIn } = useUser()
  useEffect(() => {
    const getThisPod = async () => {
      try {
        if (!loading) setLoading(true)
        const fetchedPod = await apiService.getPod(podDocId)
        if (typeof fetchedPod === 'string') throw new Error('Error!')
        setPod(fetchedPod)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    if (user && user.id) {
      getThisPod()
    }
  }, [loggedIn, user])

  return (
    <Layout title={pod ? pod.name : 'Loading...'}>
      {loading ? (
        <LoadingContent />
      ) : (
        <div className={isLarge ? styles.outerDivLarge : styles.outerDivSmall}>
          <div
            className={isLarge ? styles.innerDivLarge : styles.innerDivSmall}
          >
            <Ingredients editable={false} ingredients={pod.ingredients} />
            <Info
              price={pod.price}
              prepTime={pod.duration}
              editable={false}
              serves={pod.serves}
              mealCategories={pod.mealCategories}
            />
          </div>
          <div className={styles.directionsContainer}>
            <RecipeTitle editable={false}>{pod.name}</RecipeTitle>
            <div style={{ width: isSmall ? '100%' : '50%' }}>
              <PhotoFrame
                imageTarget={pod.photoLink}
                height={isTiny ? 300 : 500}
              />
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

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    podDocId: context.params.docId,
  },
})

export default withAuth(Recipe)
