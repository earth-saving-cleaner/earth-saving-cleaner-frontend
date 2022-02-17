import { call, put, takeEvery } from "redux-saga/effects";
import { getFeeds, addLikeUser } from "../../api";
import { feedSliceActions } from "../slices/feedSlice";

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

function* addFeedsSaga(action) {
  const { addFeedsSuccess, addFeedsFailure } = feedSliceActions;
  try {
    const { data, result, lastId } = yield call(getFeeds, action.payload);

    if (result === "ok") {
      yield put(addFeedsSuccess({ data, lastId }));
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(addFeedsFailure(err));
  }
}

export function* watchGetFeed() {
  yield takeEvery(feedSliceActions.getFeeds, getFeedSaga);
}

export function* watchAddLikeUser() {
  yield takeEvery(feedSliceActions.addLikeUser, addLikeUserSaga);
}

export function* watchAddFeedsSaga() {
  yield takeEvery(feedSliceActions.addFeeds, addFeedsSaga);
}
