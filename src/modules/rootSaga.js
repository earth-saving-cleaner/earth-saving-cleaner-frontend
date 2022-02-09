import { all, fork } from "redux-saga/effects";

import { loginSaga, watchGetFeed, watchAddLikeUser, watchAddFeedsSaga } from "./sagas/feed";

export default function* rootSaga() {
  yield all([fork(loginSaga)], [fork(watchGetFeed), fork(watchAddLikeUser), fork(watchAddFeedsSaga)]);
}
