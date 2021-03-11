import { authActions, authTypes } from "../ducks/auth";
const login = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type !== authTypes.LOGIN) {
    return;
  }
  const { data, callback } = action.payload || {};
  dispatch({
    type: authTypes.API_CALL,
    payload: {
      config: {
        method: "POST",
        url: "auth/login",
        data,
      },
      Authorization: false,
      onStart: () => authActions.startFetch(),
      onComplete: ({ data }) => {
        if (data.success) {
          dispatch(authActions.addValue("userData", data.data));
          dispatch(authActions.logged());
        }
        callback(data.success, data.data);
      },
      onError: async (error) => {
        const { data } = await error.response;
        callback(false, data.data);
      },
      onEnd: () => authActions.endFetch(),
    },
  });
};
const register = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type !== authTypes.REGISTER) {
    return;
  }
  const { data, callback } = action.payload || {};
  dispatch({
    type: authTypes.API_CALL,
    payload: {
      config: {
        method: "POST",
        url: "auth/register",
        data,
      },
      Authorization: false,
      onStart: () => authActions.startFetch(),
      onComplete: ({ data }) => {
        if (data.success) {
          dispatch(authActions.addValue("userData", data.data));
        }
        callback(data.success, data.data);
      },
      onError: async (error) => {
        const { data } = await error.response;
        callback(data.success, data.data);
      },
      onEnd: () => authActions.endFetch(),
    },
  });
};
export default [login, register];
