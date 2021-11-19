import { all, put, call, takeEvery } from 'redux-saga/effects'
import { URLUtils } from 'utils'
import { FE_ROUTE } from 'config'
import { AuthService } from 'service'
import { ACTION } from './actions'

function* SET_USER({ data: { user, redirect } }) {
  // add more info in here
  yield put({
    type: ACTION.SET_USER,
    data: { user },
  })
  if (redirect) URLUtils.moveToURL(redirect)
}

function* AUTH_LOGOUT() {
  yield put({
    type: ACTION.AUTH_LOGOUT,
  })
  yield call(AuthService.logout)
  // if not setInterval, then if we are in ROOT path, then we cannot logout
  // but we still can logout if in the other route(pages)
  setInterval(() => URLUtils.moveToURL(FE_ROUTE.DEFAULT_ROUTE), 100)
}

function* UPDATE_INFORMATION_SET_USER({ data: { user } }) {
  yield put({
    type: ACTION.UPDATE_INFORMATION_SET_USER,
    data: { user },
  })
}

export default function* AuthSaga() {
  yield all([takeEvery(ACTION.SET_USER_TRIGGER, SET_USER)])
  yield all([takeEvery(ACTION.AUTH_LOGOUT_TRIGGER, AUTH_LOGOUT)])
  yield all([takeEvery(ACTION.UPDATE_INFORMATION_TRIGGER_SET_USER, UPDATE_INFORMATION_SET_USER)])
}
