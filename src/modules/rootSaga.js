import { all, fork } from "redux-saga/effects";
import { loginSaga } from "./sagas/loginSaga";
import { signupSaga } from "./sagas/signupSage";

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(signupSaga)]);
}
