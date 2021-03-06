// eslint-disable-next-line object-curly-newline
import { useState, useRef, ChangeEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Layout,
  Directions,
  Ingredients,
  RecipeTitle,
  Info,
  SubmitButton,
  PhotoFrame,
  FileButton,
  LoadingIndicator,
  Switch,
} from '../../components'
import {
  Ingredient,
  TextFieldChange,
  Instruction,
  Duration,
  PodType,
  MealCategory,
  CheckboxChange,
  SwitchChange,
} from '../../types'
import { withAuth } from '../../hoc'
import styles from '../../styles/create.module.css'
import { ApiContext } from '../../contexts/apiContext'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'
import { PrivateIcon, PublicIcon } from '../../icons'

const CreatePage = () => {
  // Hooks
  const { isLarge, isSmall } = useWindowSize()
  const { apiService } = useContext(ApiContext)
  const { user } = useUser()
  const router = useRouter()
  // Refs
  const recipePhotoRef = useRef<HTMLInputElement | null>(null)
  // States Section
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<any>()
  const [serves, setServes] = useState<number>(1)
  const [recipeTitle, setRecipeTitle] = useState<string>()
  const [recipePrice, setRecipePrice] = useState<number>(0)
  const [recipeDuration, setRecipeDuration] = useState<Duration>({
    hours: 0,
    minutes: 0,
  })
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [activeStep, setActiveStep] = useState<number>(0)
  const [mealCategories, setMealCategories] = useState<MealCategory>({
    Breakfast: false,
    Lunch: false,
    Brunch: false,
    Dinner: false,
    Beverage: false,
    Dessert: false,
  })
  const [steps, setSteps] = useState<Instruction[]>([
    {
      label: '',
      details: '',
      error: {
        label: 'You must specify a name for an instruction.',
        details: 'You must give a description.',
      },
    },
  ])
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    amount: '',
    name: '',
    error: {
      amount: 'You must specify an amount.',
      name: 'You must specify an ingredient.',
    },
  })
  const [servesError, setServesError] = useState<string>('')
  const [recipePriceError, setRecipePriceError] = useState<string>('')
  const [recipeDurationError, setRecipeDurationError] = useState({
    hours: '',
    minutes: '',
  })
  const [titleError, setTitleError] = useState<string>(
    'You must give your recipe a title.',
  )
  // end States Section
  const handleRecipeTitleChange = (e: TextFieldChange) => {
    if (e.target.value.length === 0) {
      setTitleError('You must give your recipe a title.')
    } else {
      setTitleError('')
    }
    setRecipeTitle(e.target.value)
  }

  const handleUpdateTexts = (
    key: string,
    e: TextFieldChange,
    index: number,
  ) => {
    const newValue = e.target.value
    const stepsCopy = [...steps]
    stepsCopy[index][key] = newValue
    if (newValue.length === 0) {
      stepsCopy[index].error[key] =
        key === 'details'
          ? 'You must give a description'
          : 'You must specify a name for an instruction.'
    } else {
      stepsCopy[index].error[key] = ''
    }

    setSteps(stepsCopy)
  }
  const handleAddStepAtIndex = (index: number) => {
    const stepsCopy = [...steps]
    stepsCopy.splice(index + 1, 0, {
      label: '',
      details: '',
      error: {
        label: 'You must specify a name for an instruction.',
        details: 'You must give a description.',
      },
    })
    setSteps(stepsCopy)
    setActiveStep(activeStep + 1)
  }
  const handleRemoveStepAtIndex = (index: number) => {
    const stepsCopy = [...steps]
    stepsCopy.splice(index, 1)
    setSteps(stepsCopy)
    setActiveStep(activeStep - 1)
  }
  const handleSetNewIngredient = (e: TextFieldChange, key: string) =>
    setNewIngredient({
      ...newIngredient,
      [key]: e.target.value,
      error: {
        ...newIngredient.error,
        [key]:
          e.target.value.length > 0
            ? ''
            : `You must specify an ${key === 'name' ? 'ingredient' : 'amount'}`,
      },
    })
  const handleSetIngredient = (
    e: TextFieldChange,
    index: number,
    key: string,
  ) => {
    const ingredientsCopy = [...ingredients]
    const newValue = e.target.value
    ingredientsCopy[index][key] = newValue
    if (newValue.length > 0) {
      ingredientsCopy[index].error[key] = ''
    } else {
      const keyName = key === 'name' ? 'ingredient' : 'amount'
      ingredientsCopy[index].error[key] = `You must specify an ${keyName}.`
    }
    setIngredients(ingredientsCopy)
  }

  const handleAddIngredient = () => {
    if (ingredients.length < 99) {
      setIngredients([
        ...ingredients,
        {
          name: newIngredient.name,
          amount: newIngredient.amount,
          error: {
            name:
              newIngredient.name.length === 0
                ? 'You must specify an ingredient.'
                : '',
            amount:
              newIngredient.amount.length === 0
                ? 'You must specify an amount.'
                : '',
          },
        },
      ])
      setNewIngredient({
        amount: '',
        name: '',
        error: {
          amount: '',
          name: '',
        },
      })
    }
  }
  const handleDeleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((ingredient, i) => i !== index))
    if (ingredients.length === 1) {
      setNewIngredient({
        ...newIngredient,
        error: {
          name:
            newIngredient.name === '' ? 'You must specify an ingredient' : '',
          amount:
            newIngredient.amount === '' ? 'You must specify an amount.' : '',
        },
      })
    }
  }

  const handleHoursChange = (e: TextFieldChange) => {
    const hours = Number(e.target.value)
    let hoursError = ''
    if (Number.isNaN(hours)) {
      hoursError = 'Please enter a valid number.'
    } else if (hours > 10000) {
      hoursError = 'Total prep time is too long.'
    } else if (hours < 0) {
      hoursError = 'Total prep time cannot be less than 0 hours.'
    }
    setRecipeDurationError({
      ...recipeDurationError,
      hours: hoursError,
    })
    if (!Number.isNaN(hours)) {
      setRecipeDuration({
        ...recipeDuration,
        hours,
      })
    } else {
      setRecipeDuration({
        ...recipeDuration,
        hours: 0,
      })
    }
  }

  const handleMinutesChange = (e: TextFieldChange) => {
    const minutes = Number(e.target.value)
    let minutesError = ''
    if (Number.isNaN(minutes)) {
      minutesError = 'Please enter a valid number.'
    } else if (minutes >= 60) {
      minutesError = 'Minutes cannot be or exceed 60. Please convert to hours.'
    } else if (minutes < 0) {
      minutesError = 'Minutes must be positive.'
    }
    setRecipeDurationError({
      ...recipeDurationError,
      minutes: minutesError,
    })
    if (!Number.isNaN(minutes)) {
      setRecipeDuration({
        ...recipeDuration,
        minutes,
      })
    } else {
      setRecipeDuration({
        ...recipeDuration,
        minutes: 0,
      })
    }
  }

  const handleServesChange = (e: TextFieldChange) => {
    const servesValue = Number(e.target.value)
    if (Number.isNaN(servesValue)) {
      setServes(0)
      setServesError('Please enter a valid number of people.')
    } else if (servesValue > 1001) {
      setServesError('Recipes cannot serve more than 1000 people.')
    } else if (servesValue < 0) {
      setServesError('Recipes cannot serve less than 1 person.')
    } else {
      setServes(servesValue)
      setServesError('')
    }
  }

  const handlePriceChange = (e: TextFieldChange) => {
    const price = Number(e.target.value)
    let priceError = ''
    if (Number.isNaN(price)) {
      priceError = 'Please enter a valid price.'
    } else if (price >= 1000000) {
      priceError = 'Price cannot exceed $1 million.'
    } else if (price < 0) {
      priceError = 'Price must not be less than $0.'
    }
    setRecipePriceError(priceError)
    if (!Number.isNaN(price)) {
      setRecipePrice(price)
    } else {
      setRecipePrice(0)
    }
  }

  const handleMealCategoryChange = (e: CheckboxChange, key: string) => {
    setMealCategories({ ...mealCategories, [key]: e.target.checked })
  }

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmitRecipe = async (e: any) => {
    try {
      e.preventDefault()
      setLoading(true)
      const newPod: PodType = {
        name: recipeTitle,
        duration: recipeDuration,
        price: recipePrice,
        serves,
        isPublic,
        mealCategories,
        uid: user.id,
        ingredients: [...ingredients, newIngredient]
          .map((ingred) => ({
            name: ingred.name,
            amount: ingred.amount,
          }))
          .filter((ingred) => ingred.name && ingred.amount),
        instructions: steps
          .map((instruction: Instruction) => ({
            label: instruction.label,
            details: instruction.details,
          }))
          .filter((instruction) => instruction.label && instruction.details),
        date: new Date(),
      }
      const newPodId = await apiService.createPod(newPod)
      if (!newPodId) {
        throw new Error('No pod id provided.')
      }
      console.log('Created pod successfully!')
      await apiService.setRecipePhotoInStorage(
        recipePhotoRef.current.files[0],
        user.id,
        newPodId,
      )
      await router.push('/')
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const invalidRecipe =
    titleError.length > 0 ||
    recipePriceError.length > 0 ||
    servesError.length > 0 ||
    recipeDurationError.hours.length > 0 ||
    recipeDurationError.minutes.length > 0 ||
    !recipePhotoRef.current.files[0] ||
    steps.some(
      (instruction) => instruction.error.details || instruction.error.label,
    ) ||
    ingredients.some((ingred) => ingred.error.name || ingred.error.amount)

  return (
    <Layout title="Create a Pod">
      <div className={isLarge ? styles.outerDivLarge : styles.outerDivSmall}>
        <div className={isLarge ? styles.innerDivLarge : styles.innerDivSmall}>
          <Ingredients
            ingredients={ingredients}
            editable
            newIngredient={newIngredient}
            handleAddIngredient={handleAddIngredient}
            handleSetIngredient={handleSetIngredient}
            handleSetNewIngredient={handleSetNewIngredient}
            handleDeleteIngredient={handleDeleteIngredient}
          />
          <Info
            price={recipePrice}
            serves={serves}
            editable
            servesError={servesError}
            mealCategories={mealCategories}
            prepTime={recipeDuration}
            priceError={recipePriceError}
            hoursError={recipeDurationError.hours}
            minutesError={recipeDurationError.minutes}
            onHoursChange={handleHoursChange}
            onMinutesChange={handleMinutesChange}
            onPriceChange={handlePriceChange}
            onCheckboxChange={handleMealCategoryChange}
            onServesChange={handleServesChange}
          />
          <div style={{ width: '100%' }}>
            <Switch
              checked={isPublic}
              leftLabel="Private"
              rightLabel="Public"
              editable
              leftIcon={<PrivateIcon />}
              rightIcon={<PublicIcon />}
              onChange={(e: SwitchChange) => setIsPublic(e.target.checked)}
              name="Public"
            />
            <SubmitButton
              disabled={loading || invalidRecipe}
              onClick={handleSubmitRecipe}
            >
              {loading ? <LoadingIndicator /> : 'CREATE RECIPE'}
            </SubmitButton>
          </div>
        </div>
        <div className={styles.directionsContainer}>
          <RecipeTitle
            onChange={handleRecipeTitleChange}
            error={titleError}
            editable
          >
            {recipeTitle}
          </RecipeTitle>
          <div
            style={{
              width: isSmall ? '100%' : '50%',
            }}
          >
            <PhotoFrame imageTarget={image} height={500} />
            <FileButton inputRef={recipePhotoRef} setImage={handleSetImage} />
          </div>
          <Directions
            activeStep={activeStep}
            steps={steps}
            editable
            setActiveStep={setActiveStep}
            handleAddStepAtIndex={handleAddStepAtIndex}
            handleRemoveStepAtIndex={handleRemoveStepAtIndex}
            handleUpdateTexts={handleUpdateTexts}
          />
        </div>
      </div>
    </Layout>
  )
}

export default withAuth(CreatePage)
