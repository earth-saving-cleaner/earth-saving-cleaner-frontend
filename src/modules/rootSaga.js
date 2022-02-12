import { all, fork } from "redux-saga/effects";

import { watchGetFeed, watchAddLikeUser, watchAddFeedsSaga } from "./sagas/feed";
import { watchLogin, watchSignup } from "./sagas/login";

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchSignup), fork(watchGetFeed), fork(watchAddLikeUser), fork(watchAddFeedsSaga)]);
}
