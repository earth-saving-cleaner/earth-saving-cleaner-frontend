import { all, fork } from "redux-saga/effects";

import { watchGetFeed, watchAddLikeUser, watchAddFeedsSaga } from "./sagas/feed";
import { loginSaga } from "./sagas/loginSaga";
import { signupSaga } from "./sagas/signupSage";

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(watchGetFeed), fork(watchAddLikeUser), fork(watchAddFeedsSaga), fork(signupSaga)]);
}
