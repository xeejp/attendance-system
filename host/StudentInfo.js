import React, { Component } from 'react'
import { connect } from 'react-redux'

import IconButton from 'material-ui/IconButton'
import SocialPeople from 'material-ui/svg-icons/social/people'
import FlatButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { updateStudentInfo } from './actions'

const mapStateToProps = ({ studentInfo, page }) => ({
  studentInfo, page
})

class StudentInfo extends Component {
  constructor(props) {
    super(props)
    const { studentInfo } = this.props
    this.state = {
      studentInfo: studentInfo,
      open: false,
    }
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(event) {
    this.setState({ studentInfo: this.encodeInfo(event.target.value) })
  }

  encodeInfo(str) {
    var studentInfo = str.split('\n').map(student => {
      if(student.trim() == "") return "";
      var pair = student.split(/[,，、]/)
      if(pair.length != 2) return ""
      pair = [pair[0].replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0) }).replace(/[^\x01-\x7E]/g, "").trim(), pair[1].trim()]
      if(pair[0] == "" || pair[1] == "") return ""
      return [pair[0], pair[1]]
    })
    var list = studentInfo.filter( s => { return s != ""})
    var obj = new Object()
    for(var i in list){
      obj[list[i][0]] = list[i][1]
    }
    return obj
  }

  decodeInfo(studentInfo) {
    var res = ""
    for(var snum in studentInfo) {
      res += snum + ',' + studentInfo[snum] + '\n'
    }
    return res
  }

  submit() {
    const { dispatch } = this.props
    dispatch(updateStudentInfo(this.state.studentInfo))
    this.setState({ open: false })
  }

  render() {
    const { page, style } = this.props
    const actions = [
      <FlatButton
        label="適用"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <FlatButton
        label="キャンセル"
        onTouchTap={this.handleClose.bind(this)}
      />,
    ]
    return (
      <span style={style}>
        <FloatingActionButton
          onClick={this.handleOpen.bind(this)}
          disabled={page != "waiting"}
        >
          <SocialPeople />
        </FloatingActionButton>
        <Dialog
          title={"学生情報入力画面"}
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose.bind(this)}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText={"学籍番号,氏名(改行)の形式で入力"}
            defaultValue={this.decodeInfo(this.state.studentInfo)}
            onBlur={this.handleChange.bind(this)}
            multiLine={true}
            fullWidth={true}
          />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps)(StudentInfo)