import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const User = ({ snum, name, same }) => (
  <tr><td>{snum}</td><td>{name}</td><td>{same}件</td></tr>
)

const mapStateToProps = ({ participants, studentInfo }) => ({ participants, studentInfo })


const SameUsersList = ({ users }) => (
  <table>
    <thead><tr><th>学籍番号</th><th>氏名</th><th>重複件数</th></tr></thead>
    <tbody>{users}</tbody>
  </table>
)

const SameUsers = ({ participants, studentInfo }) => {
  var users = new Object()
  for(var id in participants) if(participants[id].snum != "") users[participants[id].snum] = 0
  for(var id in participants) if(participants[id].snum != "") users[participants[id].snum]++
  users = Object.keys(users).map(snum => [snum, (snum in studentInfo)? studentInfo[snum] : "unknown", users[snum]]).filter(l => {return l[2] >= 2}).map((user, key) => <User key={key} snum={user[0]} name={user[1]} same={user[2]} />)
  return (
  <div>
    <Card>
      <CardHeader
        title={"学籍番号重複件数 " + users.length + "件"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <SameUsersList
          users={users}
        />
      </CardText>
    </Card>
  </div>
)}

export default connect(mapStateToProps)(SameUsers)
