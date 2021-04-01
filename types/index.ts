import { ChangeEvent } from 'react'

type Action = {
  type: string
  payload: any
}
type FirebaseError = {
  code: string
}

interface MealCategory {
  Breakfast: boolean
  Lunch: boolean
  Dinner: boolean
  Beverage: boolean
  Brunch: boolean
  Dessert: boolean
}

type Serves = number

type Instruction = {
  label: string
  details: string
  error?: {
    label: string
    details: string
  }
}

type Ingredient = {
  amount: string
  name: string
  error?: {
    amount: string
    name: string
  }
}
type Duration = {
  hours: number
  minutes: number
}

interface NutritionFacts {
  [k: string]: string | number
}

type PodType = {
  docId?: string
  date: Date
  isPublic?: boolean
  duration: Duration
  mealCategories: MealCategory
  ingredients: Ingredient[]
  instructions: Instruction[]
  name: string
  photoLink?: string
  serves: Serves
  nutritionFacts?: NutritionFacts
  price: number
  uid: string
}

type PseudoEvent = {
  target: {
    value: any
  }
}

type TextFieldChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type CheckboxChange = ChangeEvent<HTMLInputElement>
type SwitchChange = ChangeEvent<HTMLInputElement>

type FirebaseUser = {
  uid: string
  email: string
  name: string
}

type PeaType = 'name' | 'duration' | 'cost' | 'rating'

type UserCookie = {
  id: string
  email: string
  token: string
  username: string
  profilePhotoLink: string
}

type SnackbarStatus = {
  open: boolean
  severity: string
  message: string
}

export type {
  Action,
  PeaType,
  MealCategory,
  CheckboxChange,
  FirebaseUser,
  PseudoEvent,
  FirebaseError,
  TextFieldChange,
  SwitchChange,
  UserCookie,
  PodType,
  Ingredient,
  Instruction,
  Duration,
  SnackbarStatus,
}
