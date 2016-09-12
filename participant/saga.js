import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, pressNumeric, updateSnum } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* pressNumericSaga() {
  while(true) {
    const { payload } = yield take(`${pressNumeric}`)
    yield call(sendData, 'press numeric', payload)
  }
}

function* updateSnumSaga() {
  while(true) {
    const { payload } = yield take(`${updateSnum}`)
    yield call(sendData, 'update snum', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(pressNumericSaga)
  yield fork(updateSnumSaga)
}

export default saga
