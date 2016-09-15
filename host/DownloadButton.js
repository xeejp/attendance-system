import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

const mapStateToProps = ({ participants, studentInfo }) => ({
  participants, studentInfo
})

const DownloadButton = ({ participants, studentInfo, style }) => (
  <FloatingActionButton
    style={style}
    onClick={() => {
      var fileName = "attendance_data.csv"

      var users = Object.keys(participants).map(id => {
            return id + ',' + participants[id].snum + ',' + ((participants[id].snum != "")? "回答済み" : "未回答") + ',' + ((participants[id].snum in studentInfo)? studentInfo[participants[id].snum] : "unknown") + ',' + participants[id].starttime + ',' + ((participants[id].finishtime != "")? participants[id].finishtime : "-")
      })

      var unanswered = Object.keys(studentInfo).map((snum, key) => {
      for(var id in participants) 
         if(snum == participants[id].snum) return ""
         return snum + ',' + studentInfo[snum]
      }).filter(s => s != "")

      var sameusers = new Object()
      for(var id in participants) if(participants[id].snum != "") users[participants[id].snum] = 0
      for(var id in participants) if(participants[id].snum != "") users[participants[id].snum]++
      sameusers = Object.keys(users).map(snum => [snum, (snum in studentInfo)? studentInfo[snum] : "unknown", users[snum]]).filter(l => {return l[2] >= 2}).map(user => { return user[0] + ',' + user[1] + ',' + user[2] + '件' })

      var content
      = "登録者 "                  + users.length           + "人\n" + "id,学籍番号,氏名,実験サインイン時刻,出席確認完了時刻,status\n" + users.join('\n')           + '\n'
      + "未出席者 "               + unanswered.length + "人\n" + "学籍番号,氏名\n"                                                                         + unanswered.join('\n') + '\n'
      + "学籍番号重複件数 " + sameusers.length    + "件\n" + "学籍番号,氏名,重複件数\n"                                                          + sameusers.join('\n')
      var blob = new Blob([content]);
      var url = window.URL || window.webkitURL;
      var blobURL = url.createObjectURL(blob);

      var a = document.createElement('a');
      a.download = fileName;
      a.href = blobURL;
       a.click();  
      }
    }
    ><FileFileDownload /></FloatingActionButton>
)

export default connect(mapStateToProps)(DownloadButton) 