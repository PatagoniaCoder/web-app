//import axios from "axios";
import { api as axios } from "../../config/constants";
import { apiTypes } from "../ducks/api";
import { authActions, authTypes } from "../ducks/auth";

const api = ({ dispatch, getState }) => (next) => (action) => {
  console.log("API", action);
  const types = [authTypes.API_CALL];

  next(action);
  if (!action || !types.includes(action.type) || !action.payload) {
    return;
  }
  const {
    config: preConfig,
    authorization,
    onStart,
    onEnd,
    onComplete,
    onError,
  } = action.payload;
  const { auth } = getState();
  const config = authorization
    ? {
        ...preConfig,
        headers: {
          ...preConfig.headers,
          Authorization: `Bearer ${auth.token}`,
        },
      }
    : preConfig;

  dispatch(onStart ? onStart() : { type: apiTypes.ON_START_NO_DEFINED });

  axios(config)
    .then((response) => {
      const { status } = response;
      if (status === 401) {
        dispatch(authActions.logout());
      }
      onComplete(response);
      dispatch(onEnd());
    })
    .catch((error) => {
      console.log("on Error", error);
      const { response } = error;
      if (response) {
        onError(error);
      } else {
        onError(error);
      }
      dispatch(onEnd());
    });
};

export default [api];
