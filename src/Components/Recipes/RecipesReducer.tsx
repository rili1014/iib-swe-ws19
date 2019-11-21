import { Dispatch, Reducer, useReducer } from 'react'

/*
 * Export eines Typs
 */
export interface Recipe {
    value: string
    created: Date
    likes: number
    id: number
    skeleton: boolean
}

interface State {
    Recipes: Recipe[]
}

/*
 * Ein Objekt vom Typ 'Action' kann eine der drei Typdefinitionen annehmen
 */
type Action =
    | {
          type: 'deleteRecipe'
          id: number
      }
    | {
          type: 'likeRecipe'
          id: number
      }

/*
 * Den generischen Typ Dispatch<T> durch den eigenen Typ 'Action' spezifizieren
 */
export interface RecipesDispatch {
    dispatch: Dispatch<Action>
}

/*
 * Die Signatur eines Reducers von React sieht wie folgt aus:
 * type Reducer<S, A> = (prevState: S, action: A) => S;
 * Es gilt daher immer eine Funktion mit zwei Parametern zu schreiben
 */
const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'deleteRecipe': {
            const Recipes = state.Recipes.filter(Recipe => Recipe.id !== action.id)
            return { Recipes }
        }
    }
}

const initialState: State = {
    Recipes: [],
}

const useRecipesReducer = () => useReducer(reducer, initialState)
/*
 * Default Export des useRecipesReducer hook für bestmögliche Kapselung
 */
export default useRecipesReducer
