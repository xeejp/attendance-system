import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateSnum } from './actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({}) => ({})

class InputSnum extends Component {
  constructor(props){
    super(props)
    this.state = { snum: "" }
  }

  handleUpdate(event){
    this.setState({ snum: event.target })
  }

  submit() {
    if(this.state.snum != "") {
      const { dispatch } = this.props
      dispatch(updateSnum(this.state.snum))
    }
  }

  render() {
    return (<div>
    <h5>学籍番号を入力してください。</h5>
    <TextField hintText={"学籍番号"} 
    onBlur={this.handleUpdate.bind(this)}
    />
    <RaisedButton label={"送信"} primary={true} onClick={this.submit.bind(this)} />
   </div>)
  }
}