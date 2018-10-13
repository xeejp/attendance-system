import concatenateReducers from 'redux-concatenate-reducers'
import { createReducer } from 'redux-act';

import { changePage } from './actions'

const reducer = concatenateReducers([
  createReducer({
    'update contents': (_, payload) => payload,
    [changePage]: (_, payload) => ({ page: payload }),
    'join': ({ participants }, { id, participant, joined }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), joined: joined}),
    'answer': ({ participants }, { id, snum, finishtime }) => {
      const result = Object.assign({}, participants, { [id]: Object.assign({}, participants[id], { snum: snum, finishtime: finishtime }) })
      return { participants: result }},
    'reset': (_, { participants, joined, answered }) => ({
      participants: participants, joined: joined, answered: answered, number: [], backup: [] }),
    'qupdate': (_, { max, combo, seconds, timeout, timeoutable }) => ({ max: max, combo: combo, seconds: seconds, timeout, timeoutable }),
    'nupdate': (_, payload) => ({ number: payload }),
    'sInfoupdate': (_, payload) => ({ studentInfo: payload}),
    'fullscreen': (_, payload) => ({ fullscreen: payload }),
  }, {}),
  createReducer({
    'update contents': () => ({ loading: false })
  }, { loading: true })
])

export default reducer