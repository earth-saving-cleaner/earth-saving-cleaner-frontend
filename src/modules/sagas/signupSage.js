import axios from "axios";

import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import { signupSuccess, signupFailure } from "../slices/signupSlice";

function* signup(userInfo) {
  const signupApi = async () => {
    const response = await axios({
      url: process.env.REACT_APP_SIGN_UP_URL,
      method: "post",
      data: userInfo,
    });
    return response.data;
  };

  try {
    const res = yield call(signupApi);

    if (res.result === "ok") {
      yield put({
        type: signupSuccess,
        data: res,
      });
    } else {
      yield put({
        type: signupFailure,
        data: res.message,
      });
    }
  } catch (err) {
    yield put({
      type: signupFailure,
      data: err.response,
    });
  }
}

function* watchSignup() {
  yield takeLatest("signupRequest", signup);
}

export function* signupSaga() {
  yield all([fork(watchSignup)]);
}

export default signupSaga;
