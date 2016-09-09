import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, pressNumeric } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* pressNumericSaga() {
  while(true) {
    const { payload } = yield take(`${presNumeric}`)
    yield call(sendData, 'press numeric', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(pressNumericSaga)
}

export default saga
