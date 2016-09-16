import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const User = ({ snum, name }) => (
  <tr><td>{snum}</td><td>{name}</td></tr>
)

const mapStateToProps = ({ participants, studentInfo, page }) => ({ participants, studentInfo, page })

const UnansweredList = ({ users }) => (
  <table>
    <thead><tr><th>学籍番号</th><th>氏名</th></tr></thead>
    <tbody>{users}</tbody>
  </table>
)

const Unanswered = ({ participants, studentInfo, page}) => {
    var users = Object.keys(studentInfo).map((snum, key) => {
     for(var id in participants) 
        if(snum == participants[id].snum && participants[id].finishtime != "") return null
     return (
        <User
          key={key}
          snum={snum}
          name={studentInfo[snum]}
        />
      )
   }).filter(v => { return v != null})
  return (
  <div>
    <Card>
      <CardHeader
        title={"未出席者 " + users.length + "人"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UnansweredList
          users={users}
        />
      </CardText>
    </Card>
  </div>
)}

export default connect(mapStateToProps)(Unanswered)
