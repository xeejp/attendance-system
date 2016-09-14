import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs'
import {Card} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import FlatButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import { updateQuestion } from './actions'

const mapStateToProps = ({ page, max, combo, seconds, timeout, timeoutable }) => ({
  page, max, combo, seconds, timeout, timeoutable
})

class EditQuestion extends Component {
  constructor(props){
    super(props)
    const { max, combo, seconds, timeout, timeoutable } = this.props
    this.state = {
      open: false,
      mainSlideIndex: 0,
      disabled: false,
      question_text: {
        max: max, //入力可能時間
        combo: combo, //必要コンボ数
        seconds: seconds, //何秒毎に数字を出すか
        timeout: timeout,
        timeoutable: timeoutable,
      },
      default_text: {
        max: 2, //入力可能時間
        combo: 5, //必要コンボ数
        seconds: 1, //何秒毎に数字を出すか
        timeout: 1, //終了までの時間
        timeoutable: true,
      }
    }
  }

  QuestionTab(){
    return (
        <div>
          <TextField
            hintText={"入力受け付け期間"}
            defaultValue={this.state.question_text.max}
            floatingLabelText={"入力受け付け期間"}
            onChange={this.handleChangeOnlyNum.bind(this, ["max"], false)}
          />回前まで<br />
          <TextField
            hintText={"必要入力数"}
            defaultValue={this.state.question_text.combo}
            floatingLabelText={"必要入力数"}
            onChange={this.handleChangeOnlyNum.bind(this, ["combo"], false)}
          />回<br />
          <TextField
            hintText={"数字の更新間隔"}
            defaultValue={this.state.question_text.seconds}
            floatingLabelText={"数字の更新間隔"}
            onChange={this.handleChangeOnlyNum.bind(this, ["seconds"], true)}
          />秒<br />
          <Checkbox
            label={"自動的に実験を終了する。"}
            defaultChecked={this.state.question_text.timeoutable}
            onCheck={this.handleCheckChange.bind(this)}
            style={{marginTop: "5%"}}
          /><br />
          <TextField
            hintText={"終了するまでの時間"}
            defaultValue={this.state.question_text.timeout}
            floatingLabelText={"終了するまでの時間"}
            onChange={this.handleChangeOnlyNum.bind(this, ["timeout"], true)}
            disabled={!this.state.question_text.timeoutable}
          />分
        </div>
    )
  }

  handleChangeOnlyNum(value, flag, event){
    if(isNaN(event.target.value) || (!flag && event.target.value.indexOf('.') != -1)) {
      this.setState({ disabled: true })
      return
    }
    var question_text = Object.assign({}, this.state.question_text)
    var temp1 = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp1 = temp1[value[i]]
    }
    var temp2 = flag? parseFloat(temp1[value[value.length - 1]]) : parseInt(temp1[value[value.length - 1]])
    temp1[value[value.length - 1]] = flag? parseFloat(event.target.value) : parseInt(event.target.value)
    this.setState({ question_text: question_text, disabled: false })
  }

  handleCheckChange(event, checked) {
    console.log(checked)
    this.setState({ question_text: Object.assign({}, this.state.question_text, { timeoutable: checked}) })
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(value, event){
    var question_text = Object.assign({}, this.state.question_text)
    var temp = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ question_text: question_text })
  }

  handleMainSlide(value){
    this.setState({
      mainSlideIndex: value
    })
  }

  submit() {
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
    this.setState({ open: false })
  }

  reset(){
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
    this.setState({ question_text: this.state.default_text, open: false})
  }

  render(){
    const { page } = this.props
    const actions = [
      <FlatButton
        label="適用"
        disabled={this.state.disabled}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <FlatButton
        label="キャンセル"
        onTouchTap={this.handleClose.bind(this)}
      />,
     <FlatButton
        label="すべてリセット"
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (<span>
      <FloatingActionButton onClick={this.handleOpen.bind(this)} disabled={page != "waiting"}>
         <ImageEdit />
      </FloatingActionButton>
      <Dialog
        title="編集画面"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        autoScrollBodyContent={true}
      >
       {this.QuestionTab()}
      </Dialog>
    </span>)
  }
}

export default connect(mapStateToProps)(EditQuestion)