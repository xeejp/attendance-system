import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, backPage, nextPage, submitPage, changePage, updateQuestion, updateNumber, updateStudentInfo, changeFullScreen, escapeFullScreen } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('change page', payload)
    if(payload == "waiting" || payload == "experiment") {
      yield call(sendData, 'all reset')
      yield call(sendData, 'update number', Math.floor( Math.random() * 10))
    }
    if(payload == "experiment") {
      yield put(changeFullScreen())
    }
    yield put(changePage(payload))
  }
}
function* backPageSaga() {
  const pages = ["waiting", "experiment", "result"]
  while (true) {
    yield take(`${backPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[pages.length - 1]
    for (let i = pages.length - 1; i >= 0; i --) {
      if (page == pages[i]) {
        next = pages[(pages.length - 1 + i) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}


function* nextPageSaga() {
  const pages = ["waiting", "experiment", "result"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* updateQuestionSaga() {
  while(true) {
    const { payload } = yield take(`${updateQuestion}`)
    yield call(sendData, 'update question', payload)
  }
}

function* updateNumberSaga() {
  while(true) {
    yield take(`${updateNumber}`)
    const { number: number } = yield select()
    var r = Math.floor( Math.random() * 10)
    while(r == number[number.length - 1]) r = Math.floor( Math.random() * 10)
    yield call(sendData, 'update number', r)
  }
}

function* updateStudentInfoSaga() {
  while(true) {
    const { payload } = yield take(`${updateStudentInfo}`)
    yield call(sendData, 'update student info', payload)
  }
}

function* changeFullScreenSaga() {
  while(true) {
    yield take(`${changeFullScreen}`)
    yield call(sendData, 'change fullscreen')
  }
}

function* escapeFullScreenSaga() {
  while(true) {
    yield take(`${escapeFullScreen}`)
    yield call(sendData, 'escape fullscreen')
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(backPageSaga)
  yield fork(nextPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(updateQuestionSaga)
  yield fork(updateNumberSaga)
  yield fork(updateStudentInfoSaga)
  yield fork(changeFullScreenSaga)
  yield fork(escapeFullScreenSaga)
}

export default saga
