import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents, changePage } from './actions'

import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import FullScreenMode from './FullScreenMode'
import PageButtons from './PageButtons'
import EditQuestion from './EditQuestion'
import Users from './Users'

const mapStateToProps = ({loading, page, timeout, timeoutable}) => ({
  loading, page, timeout, timeoutable
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { FullScreenFlag: false }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  changeFullScreen() {
    this.setState({ FullScreenFlag: true })
  }

  changePage() {
    clearInterval(this.timer)
    this.setState({ FullScreenFlag: false })
    const { dispatch } = this.props
    dispatch(changePage("result"))
  }

  render() {
    const { loading, page, timeout, timeoutable } = this.props
    if (loading) {
      return <p>ロード中です。</p>
    } else if (this.state.FullScreenFlag) {
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
          <EditQuestion /><br />
          <RaisedButton label={"フルスクリーンモード"} primary={true} onClick={this.changeFullScreen.bind(this)}/><br />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)