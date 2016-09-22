import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardText } from 'material-ui/Card'

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
    {(answered)? <Card><CardText><p>出席を受け付けました。</p><p>しばらくお待ちください。</p></CardText></Card> : (snum == "")? <Card><CardText><div style={{textAlign: "center"}}><InputSnum /></div></CardText></Card> : <NumberKeypad />}
    </div>)
  } 
}

export default connect(mapStateToProps)(Experiment)
