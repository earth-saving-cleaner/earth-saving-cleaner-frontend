import axios from "axios";

import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "../slices/loginSlice";

function* logIn({ type, userInfo }) {
  const loginApi = async () => {
    const response = await axios({
      url: process.env.REACT_APP_LOGIN_URL,
      method: "post",
      data: {
        token: userInfo.tokenId,
      },
    });
    return response.data;
  };

  try {
    const res = yield call(loginApi);
    yield put({
      type: loginSuccess,
      data: res,
    });
  } catch (err) {
    yield put({
      type: loginFailure,
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("loginRequest", logIn);
}

export function* loginSaga() {
  yield all([fork(watchLogin)]);
}

export default loginSaga;
