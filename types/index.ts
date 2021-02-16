import { ChangeEvent } from 'react'

type Action = {
    type: string,
    payload: any,
}
type FirebaseError = {
    code: string
}

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

type PodType = {
    docId?: string
    date: Date
    duration: Duration
    ingredients: Ingredient[]
    instructions: Instruction[]
    name: string
    photoLink?: string
    price: number
    uid: string
}

type PseudoEvent = {
    target: {
        value: any
    }
}

type TextFieldChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

type FirebaseUser = {
    uid: string
    email: string
    name: string
}

type PeaType = 'name' | 'duration' | 'cost' | 'rating'

type UserCookie = {
    id: string,
    email: string,
    token: string,
    username: string,
    profilePhotoLink: string,
}

export type {
  Action,
  PeaType,
  FirebaseUser,
  PseudoEvent,
  FirebaseError,
  TextFieldChange,
  UserCookie,
  PodType,
  Ingredient,
  Instruction,
  Duration,
}
