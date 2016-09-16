import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { openParticipantPage } from './actions'

const User = ({ id, snum, name, starttime, finishtime, status, openParticipantPage }) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td><th>{snum}</th><th>{name}</th><th>{starttime}</th><th>{finishtime}</th><td>{status}</td></tr>
)

const mapStateToProps = ({ participants, studentInfo, page }) => ({ participants, studentInfo, page })

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const UsersList = ({participants, studentInfo, page, openParticipantPage }) => (
  <table>
    <thead><tr><th>id</th><th>学籍番号</th><th>氏名</th><th>実験サインイン時刻</th><th>出席確認完了時刻</th><th>status</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            snum={(participants[id].finishtime != "")? participants[id].snum : '-'}
            status={(participants[id].finishtime != "")? "回答済み" : "未回答"}
            name={(participants[id].snum in studentInfo && participants[id].finishtime != "")? studentInfo[participants[id].snum] : "unknown"}
            starttime={participants[id].starttime}
            finishtime={(participants[id].finishtime != "")? participants[id].finishtime : "-"}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Users = ({ participants, studentInfo, page, openParticipantPage }) => (
  <div>
    <Card>
      <CardHeader
        title={"登録者 " + Object.keys(participants).length + "人"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          page={page}
          studentInfo={studentInfo}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Users)
