import {
  useState, useRef, ChangeEvent, useContext,
} from 'react'
import {
  Layout,
  CreateDirections,
  CreateIngredients,
  CreateRecipeTitle,
  CreateInfo,
  SubmitButton,
  PhotoFrame,
  FileButton,
  LoadingIndicator,
} from '../../components'
import {
  Ingredient, TextFieldChange, Instruction, Duration, PodType,
} from '../../types'
import { ApiContext } from '../../contexts/apiContext'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'

const CreatePage = () => {
  // Hooks
  const { windowSize } = useWindowSize()
  // const { apiService } = useContext(ApiContext)
  const { user } = useUser()
  // Refs
  const recipePhotoRef = useRef<HTMLInputElement | null>(null)
  // States Section
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<any>()
  const [recipeTitle, setRecipeTitle] = useState<string>()
  const [recipePrice, setRecipePrice] = useState<number>(0)
  const [recipeDuration, setRecipeDuration] = useState<Duration>({
    hours: 0,
    minutes: 0,
  })
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [activeStep, setActiveStep] = useState<number>(0)
  const [steps, setSteps] = useState<Instruction[]>([{
    label: '',
    details: '',
    error: {
      label: 'You must specify a name for an instruction.',
      details: 'You must give a description.',
    },
  }])
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    amount: '',
    name: '',
    error: {
      amount: 'You must specify an amount.',
      name: 'You must specify an ingredient.',
    },
  })
  const [recipePriceError, setRecipePriceError] = useState<string>('')
  const [recipeDurationError, setRecipeDurationError] = useState({
    hours: '',
    minutes: '',
  })
  const [titleError, setTitleError] = useState<string>('You must give your recipe a title.')
  // end States Section
  const handleRecipeTitleChange = (e: TextFieldChange) => {
    if (e.target.value.length === 0) {
      setTitleError('You must give your recipe a title.')
    } else {
      setTitleError('')
    }
    setRecipeTitle(e.target.value)
  }

  const handleUpdateTexts = (key: string, e: TextFieldChange,
    index: number) => {
    const newValue = e.target.value
    const stepsCopy = [...steps]
    stepsCopy[index][key] = newValue
    if (newValue.length === 0) {
      stepsCopy[index].error[key] = key === 'details'
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
  const handleSetNewIngredient = (e: TextFieldChange, key: string) => (
    setNewIngredient({
      ...newIngredient,
      [key]: e.target.value,
      error: {
        ...newIngredient.error,
        [key]: e.target.value.length > 0 ? '' : `You must specify an ${key === 'name' ? 'ingredient' : 'amount'}`,
      },
    })
  )
  const handleSetIngredient = (e: TextFieldChange, index :number, key: string) => {
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
      setIngredients([...ingredients, {
        name: newIngredient.name,
        amount: newIngredient.amount,
        error: {
          name: newIngredient.name.length === 0 ? 'You must specify an ingredient.' : '',
          amount: newIngredient.amount.length === 0 ? 'You must specify an amount.' : '',
        },
      }])
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
          name: newIngredient.name === '' ? 'You must specify an ingredient' : '',
          amount: newIngredient.amount === '' ? 'You must specify an amount.' : '',
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

  const handleSubmitRecipe = () => {
    setLoading(true)
    const newPod: PodType = {
      name: recipeTitle,
      duration: recipeDuration,
      price: recipePrice,
      uid: user.id,
      ingredients: [...ingredients, newIngredient],
      instructions: steps,
      date: new Date(),
    }
    console.log(newPod)
    setLoading(false)
  }

  return (
    <Layout title="Create a Pod">
      <div style={windowSize > 800 ? {} : {
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
      >
        <div style={windowSize > 800 ? {
          width: '45%',
          borderRadius: '2rem',
          position: 'fixed',
          overflow: 'auto',
          top: 75,
          bottom: 0,
          paddingLeft: '1rem',
          marginLeft: '50%',
          marginRight: '0%',
          zIndex: 3,
        } : {
          borderRadius: '2rem',
          overflowY: 'scroll',
          marginBottom: '3rem',
          zIndex: 3,
        }}
        >

          <CreateIngredients
            ingredients={ingredients}
            newIngredient={newIngredient}
            handleAddIngredient={handleAddIngredient}
            handleSetIngredient={handleSetIngredient}
            handleSetNewIngredient={handleSetNewIngredient}
            handleDeleteIngredient={handleDeleteIngredient}
          />
          <CreateInfo
            price={recipePrice}
            prepTime={recipeDuration}
            priceError={recipePriceError}
            hoursError={recipeDurationError.hours}
            minutesError={recipeDurationError.minutes}
            onHoursChange={handleHoursChange}
            onMinutesChange={handleMinutesChange}
            onPriceChange={handlePriceChange}
          />
          <div style={{ width: '100%' }}>
            <SubmitButton
              disabled={loading}
              onClick={handleSubmitRecipe}
            >
              {loading ? <LoadingIndicator /> : 'CREATE RECIPE'}
            </SubmitButton>
          </div>
        </div>
        <div style={{
          position: 'relative', overflow: 'auto',
        }}
        >
          <CreateRecipeTitle
            onChange={handleRecipeTitleChange}
            error={titleError}
          >
            {recipeTitle}
          </CreateRecipeTitle>
          <div style={{
            width: windowSize < 800 ? '100%' : '50%',
          }}
          >
            <PhotoFrame
              imageTarget={image}
              height={500}
            />
            <FileButton
              inputRef={recipePhotoRef}
              setImage={(e: ChangeEvent<HTMLInputElement>) => setImage(
                URL.createObjectURL(e.target.files[0]),
              )}
            />
          </div>
          <CreateDirections
            activeStep={activeStep}
            steps={steps}
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

export default CreatePage
