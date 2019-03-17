import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.ADD_INGREDIENT)
        return addIngredient(state, action);

    else if (action.type === actionTypes.REMOVE_INGREDIENT)
        return removeIngredient(state, action);

    else if (action.type === actionTypes.SET_INGREDIENTS)
        return setIngredients(state, action);

    else if (action.type === actionTypes.FETCH_INGREDIENTS_FAILED)
        return updateObject(state, { error: true });

    else
        return state;
}

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 4,
        building: false
    });
};

export default reducer;