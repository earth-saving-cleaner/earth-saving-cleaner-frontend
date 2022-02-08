import axios from "axios";

import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import { LoginSuccess, LoginFailure } from "../slices/loginSlice";

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
      type: LoginSuccess,
      data: res,
    });
  } catch (err) {
    yield put({
      type: LoginFailure,
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LoginRequest", logIn);
}

export function* loginSaga() {
  yield all([fork(watchLogin)]);
}

export default loginSaga;
