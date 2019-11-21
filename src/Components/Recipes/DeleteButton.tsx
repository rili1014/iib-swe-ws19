import { Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { memo, useEffect, useState } from 'react'

import { Recipe, RecipesDispatch } from './RecipesReducer'

/*
 * Wichtig bei der Entwicklung von Anwendungen ist das Einhalten eines einheitlichen Casing
 * https://www.chaseadams.io/most-common-programming-case-types/#javascript-conventions
 *
 * 'Camel case for variables and methods.' --> exampleCase
 * 'Pascal case for types and classes (and functions) in JavaScript.' --> ExampleCase
 * 'Upper case snake case for constants.' --> EXAMPLE_CASE
 */
const LOADING_Recipe_KEY = 'Recipe_KEY'

export const RecipesButton = ({ dispatch }: RecipesDispatch) => {
    /*
     * Je nach Hook destructering von Objekten oder Arrays
     */
    const [loadingRecipe, setLoadingRecipe] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    /*
     * das zweite Argument bei useEffect ist der sogennante "Dependency Array"
     * Ändert sich der Wert eines dieser Einträge, so wird die Funktion aufgerufen,
     * die als erstes Argument übergeben wurde
     */
    useEffect(() => {
        if (loadingRecipe) {
            enqueueSnackbar('Loading new Recipe', {
                key: LOADING_Recipe_KEY,
                variant: 'info',
                persist: true,
            })
        } else {
            closeSnackbar(LOADING_Recipe_KEY)
        }
    }, [closeSnackbar, enqueueSnackbar, loadingRecipe])

    const handleAddBtnClick = async () => {
        setLoadingRecipe(true)

        const Recipe: Recipe = {
            value: '',
            likes: 0,
            id: new Date().getTime(),
            skeleton: true,
            created: new Date(),
        }
        dispatch({ type: 'addRecipe', Recipe })

        const response = await fetch('https://api.chucknorris.io/Recipes/random')
        const json = await response.json()

        /*
         * "Verzögerung" der Stateänderung durch setTimeout, um die Snackbar länger anzuzeigen
         */
        setTimeout(() => {
            setLoadingRecipe(false)
            dispatch({
                type: 'addRecipe',
                Recipe: {
                    ...Recipe,
                    value: json.value,
                    skeleton: false,
                    created: new Date(json.created_at),
                },
            })
        }, 2000)
    }

    return (
        <Button
            disabled={loadingRecipe}
            onClick={handleAddBtnClick}
            fullWidth
            variant="contained"
            color="primary">
            Add Recipe
        </Button>
    )
}

export default memo(RecipesButton)
