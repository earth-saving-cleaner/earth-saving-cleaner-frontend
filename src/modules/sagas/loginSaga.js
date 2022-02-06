import axios from "axios";

import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import { LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../slices/loginSlice";

function* logIn(action) {
  const loginApi = async () => {
    const response = await axios({
      url: process.env.REACT_APP_LOGIN_URL,
      method: "post",
      data: {
        token: action.userInfo,
      },
    });
    return response.data;
  };

  try {
    const res = yield call(loginApi);
    yield put({
      type: LOG_IN_SUCCESS,
      data: res,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

export function* loginSaga() {
  yield all([fork(watchLogin)]);
}

export default loginSaga;
