import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents, submitPage, changeFullScreen } from './actions'

import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import FullScreenMode from './FullScreenMode'
import PageButtons from './PageButtons'
import EditQuestion from './EditQuestion'
import StudentInfo from './StudentInfo'
import Users from './Users'
import Unanswered from './Unanswered'
import SameUsers from './SameUsers'
import DownloadButton from './DownloadButton'

const mapStateToProps = ({loading, page, timeout, timeoutable, fullscreen}) => ({
  loading, page, timeout, timeoutable, fullscreen
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  changeFullScreen() {
    const { dispatch } = this.props
    dispatch(changeFullScreen())
  }

  changePage() {
    clearInterval(this.timer)
    const { dispatch } = this.props
    dispatch(submitPage("result"))
    dispatch(fetchContents())
  }

  render() {
    const { loading, page, timeout, timeoutable, fullscreen } = this.props
    if (loading) {
      return <p>ロード中です。</p>
    } else if (fullscreen && page == "experiment") {
      if(timeoutable) this.timer = setInterval(this.changePage.bind(this), timeout * 60000)
      return <FullScreenMode />
    } else {
      return (
        <div>
          <PageButtons />
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
          <Users /><br />
          <Unanswered /><br />
          <SameUsers /><br />
          <EditQuestion /><StudentInfo style={{marginLeft: "2%"}} /><DownloadButton style={{marginLeft: "2%"}} />
          <br /><br />
          <RaisedButton label={"フルスクリーンモード"} primary={true}disabled={page != "experiment"} onClick={this.changeFullScreen.bind(this)}/><br />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)