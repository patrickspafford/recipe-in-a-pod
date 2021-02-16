import { useState } from 'react'
import { } from '@material-ui/core'
import { Ingredient } from '../../types'

const CreateRecipeForm = () => {
  const [instructions, setInstructions] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [name, setName] = useState<string>('Sample Recipe')
  const [price, setPrice] = useState<number>(10)

  return (
    <form />
  )
}
