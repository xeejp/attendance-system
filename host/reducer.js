import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import { changePage } from './actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    [changePage]: (_, { payload }) => ({ page: payload }),
    'join': ({ participants }, { payload: { id, participant, joined } }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), joined: joined}),
    'answer': ({ participants }, { payload: { id, snum } }) => {
      const result = Object.assign({}, participants, { [id]: Object.assign({}, participants[id], { snum: snum}) })
      return { participants: result }},
    'reset': (_, { payload: {participants, joined, answered} }) => ({
      participants: participants, joined: joined, answered: answered, number: [], backup: [] }),
    'result': (_, { payload: {oneone, onetwo, twoone, twotwo} }) => ({
      oneone: oneone, onetwo: onetwo, twoone:twoone, twotwo: twotwo, answered: 0 }),
    'qupdate': (_, { payload: { max, combo, seconds } }) => ({ max: max, combo: combo, seconds: seconds }),
    'nupdate': (_, { payload }) => ({ number: payload }),
  }, {}),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer