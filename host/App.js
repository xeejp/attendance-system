import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import fullScreenMode from './fullScreenMode'
import PageButtons from './PageButtons'
import EditQuestion from './EditQuestion'
import Users from './Users'

const mapStateToProps = ({loading, page}) => ({
  loading, page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { fullScreenMode: false }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  fullScreenMode() {
    this.setState({ fullScreenMode: true })
  }

  render() {
    const { loading, page } = this.props
    if (loading) {
      return <p>ロード中です。</p>
    } else if (this.state.fullScreenMode) {
      return <fullScreenMode />
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
          <RaisedButton label={"フルスクリーンモード"} primary={true} onClick={this.fullScreenMode.bind(this)}/>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)