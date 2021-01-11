import { ChangeEvent } from 'react'

type Action = {
    type: string,
    payload: any,
}
type FirebaseError = {
    code: string
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

export type {
  Action, PeaType, FirebaseUser, PseudoEvent, FirebaseError, TextFieldChange,
}
