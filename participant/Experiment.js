import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import InputSnum from './InputSnum'
import NumberKeypad from './NumberKeypad'

import { nextQuestion } from './actions'

const mapStateToProps = ({ answered, snum }) => ({
  answered, snum
})

class Experiment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { answered, snum } = this.props
    return (<div>
    {(answered)? <div><p>出席を受け付けました。</p><p>しばらくお待ちください。</p></div> : (snum == "")? <InputSnum /> : <NumberKeypad />}
    </div>)
  } 
}

export default connect(mapStateToProps)(Experiment)
