import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.AUTH_SUCCESS)
        return authSuccess(state, action);

    else if (action.type === actionTypes.AUTH_START)
        return updateObject(state, { error: null, loading: true });

    else if (action.type === actionTypes.AUTH_FAIL)
        return updateObject(state, { error: action.error, loading: false });

    else if (action.type === actionTypes.AUTH_LOGOUT)
        return updateObject(state, { token: null, userId: null });

    else if (action.type === actionTypes.SET_AUTH_REDIRECT_PATH)
        return updateObject(state, { authRedirectPath: action.path });

    else
        return state;
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

export default reducer;