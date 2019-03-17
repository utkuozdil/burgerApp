import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://react-my-burger-59a3c.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}