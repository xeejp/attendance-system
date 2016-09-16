import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import { changePage } from './actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    [changePage]: (_, { payload }) => ({ page: payload }),
    'join': ({ participants }, { payload: { id, participant, joined } }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), joined: joined}),
    'answer': ({ participants }, { payload: { id, snum, finishtime } }) => {
      const result = Object.assign({}, participants, { [id]: Object.assign({}, participants[id], { snum: snum, finishtime: finishtime }) })
      return { participants: result }},
    'reset': (_, { payload: {participants, joined, answered} }) => ({
      participants: participants, joined: joined, answered: answered, number: [], backup: [] }),
    'qupdate': (_, { payload: { max, combo, seconds, timeout, timeoutable } }) => ({ max: max, combo: combo, seconds: seconds, timeout, timeoutable }),
    'nupdate': (_, { payload }) => ({ number: payload }),
    'sInfoupdate': (_, { payload }) => ({ studentInfo: payload}),
    'fullscreen': (_, { payload }) => ({ fullscreen: payload }),
  }, {}),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer