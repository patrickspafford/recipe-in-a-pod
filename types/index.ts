
type Action = {
    type: string,
    payload: any,
}

type PseudoEvent = {
    target: {
        value: any
    }
}

type FirebaseUser = {
    uid: string
    email: string
    name: string
}

type PeaType = 'name' | 'duration' | 'cost' | 'rating'

export type { Action, PeaType, FirebaseUser, PseudoEvent }