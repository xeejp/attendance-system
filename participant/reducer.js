import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ joined: payload }),
    'reset': (_, { payload }) => payload,
    'result': (_, { payload: { } }) => ({
       }),
    'answered': (_, { payload }) => ({
      answered: payload
    }),
    'qupdate': (_, { payload }) => ({ question_text: payload }),
    'supdate': (_, { payload }) => ({ snum: payload })
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer