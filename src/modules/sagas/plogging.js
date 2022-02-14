import { put, call, takeLatest } from "redux-saga/effects";

import { addScore } from "../../api";
import { userSliceActions } from "../slices/userSlice";

function* addScoreSaga(action) {
  const { addScoreSuccess, addScoreFailure } = userSliceActions;

  try {
    const {
      data: {
        result,
        updatedInfo: {
          updatedUser: { score, level },
        },
      },
    } = yield call(addScore, action.payload);

    if (result === "ok") {
      yield put(addScoreSuccess({ score, level }));
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(addScoreFailure(err));
  }
}

export function* watchAddScore() {
  yield takeLatest(userSliceActions.addScore, addScoreSaga);
}
