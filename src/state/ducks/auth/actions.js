import { createAction } from "redux-actions";
import types from "./types";

export const clear = createAction(types.CLEAR);
export const endFetch = createAction(types.END_FETCH);
export const login = createAction(types.LOGIN);
export const logout = createAction(types.LOGOUT);
export const logged = createAction(types.LOGGED);
export const register = createAction(types.REGISTER);
export const signIn = createAction(types.SIGN_IN);
export const startFetch = createAction(types.START_FETCH);
export const setLenguage = createAction(types.SET_LENGUAGE)
export const addValue = createAction(types.ADD_VALUE, (key, value) => (
    {
        key,
        value
    }
));

export default {
    clear,
    endFetch,
    login,
    logout,
    logged,
    register,
    signIn,
    startFetch,
    addValue,
    setLenguage
};
