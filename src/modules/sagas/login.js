import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

import { login as loginAPI, signup as signupAPI } from "../../api";
import history from "../../utils/history";
import { userSliceActions } from "../slices/userSlice";

function* loginSaga({ payload: { tokenId } }) {
  const { loginSuccess, loginFailure, unregistered } = userSliceActions;

  try {
    const { result, message, email, googleToken, token, id, nickname, profileImage, score, level } = yield call(
      loginAPI,
      tokenId,
    );

    if (message === "nickname Request") {
      yield put(unregistered({ googleToken, email }));
      history.push("/signup");

      return;
    }

    if (result === "ok") {
      yield put(loginSuccess({ email, token, id, nickname, profileImage, score, level }));
      history.push("/");
    }

    throw new Error();
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* signupSaga(action) {
  const { signupSuccess, signupFailure } = userSliceActions;

  try {
    const { result, message, ...rest } = yield call(signupAPI, action.payload);

    if (result === "ok") {
      yield put(signupSuccess(rest));
      history.push("/");

      return;
    }

    if (message === "duplicatedNickname") {
      yield put(signupFailure(message));
    }
  } catch (err) {
    yield put(signupFailure(err));
  }
}

export function* watchLogin() {
  yield takeLatest(userSliceActions.login, loginSaga);
}

export function* watchSignup() {
  yield takeLatest(userSliceActions.signup, signupSaga);
}
