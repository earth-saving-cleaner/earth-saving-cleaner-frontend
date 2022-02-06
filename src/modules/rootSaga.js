import { all, fork } from "redux-saga/effects";
import { loginSaga } from "./sagas/loginSaga";

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
