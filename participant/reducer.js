import concatenateReducers from 'redux-concatenate-reducers'
import { createReducer } from 'redux-act';

const reducer = concatenateReducers([
  createReducer({
    'update contents': (_, payload) => payload,
    'change page': (_, payload) => ({ page: payload }),
    'joined': (_, payload) => ({ joined: payload }),
    'reset': (_, payload) => payload,
    'result': () => ({ }),
    'answered': (_, payload) => ({ answered: payload }),
    'qupdate': (_, payload) => ({ question_text: payload }),
    'supdate': (_, payload) => ({ snum: payload })
  }),
  createReducer({
    'update contents': () => ({ loading: false })
  }, { loading: true }),
])

export default reducer