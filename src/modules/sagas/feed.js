import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { feedSliceActions } from "../slices/feedSlice";
import { getFeeds, addLikeUser } from "../../api";

function* getFeedSaga(action) {
  const { getFeedsSuccess, getFeedsFailure } = feedSliceActions;

  try {
    const { data, result, lastId } = yield call(getFeeds, action.payload);

    if (result === "ok") {
      yield put(getFeedsSuccess({ data, lastId }));
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(getFeedsFailure(err));
  }
}

function* addLikeUserSaga(action) {
  const { addLikeUserSuccess, addLikeUserFailure } = feedSliceActions;

  try {
    const { data, result } = yield call(addLikeUser, action.payload);

    if (result === "ok") {
      yield put(addLikeUserSuccess({ data }));
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(addLikeUserFailure(err));
  }
}

export function* watchGetFeed() {
  yield takeEvery(feedSliceActions.getFeeds, getFeedSaga);
}

export function* watchAddLikeUser() {
  yield takeEvery(feedSliceActions.addLikeUser, addLikeUserSaga);
}
