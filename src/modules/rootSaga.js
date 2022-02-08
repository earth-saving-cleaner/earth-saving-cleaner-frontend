import { all, fork } from "redux-saga/effects";
import { watchGetFeed, watchAddLikeUser, watchAddFeedsSaga } from "./sagas/feed";

export default function* rootSaga() {
  yield all([fork(watchGetFeed), fork(watchAddLikeUser), fork(watchAddFeedsSaga)]);
}
