import React, { Component } from 'react'
import { connect} from 'react-redux'

import keydown, { Keys } from 'react-keydown'

import { updateNumber, escapeFullScreen } from './actions'

const mapStateToProps = ({ number, seconds }) => ({
  number, seconds
})

const { ESC } = Keys

class FullScreenMode extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Materialize.toast('FullScreenを終了するにはESCキーを押してください。', 4000, 'rounded')
  }

  componentWillReceiveProps( { keydown } ) {
    if (keydown.event && keydown.event.which == ESC) {
      this.escapeFullScreen()
    }
  }

  escapeFullScreen() {
    const { dispatch } = this.props
    dispatch(escapeFullScreen())
  }

  handleUpdate() {
    const { dispatch } = this.props
    dispatch(updateNumber())
  }

  render() {
    const { number, seconds } = this.props
    setTimeout(this.handleUpdate.bind(this), 1000 * seconds)
    return (
      <div style={{textAlign: "center"}}>
        <font style={{"font-size": "500", width: "100%"}}>{number[number.length - 1]}</font>
      </div>
    )
  }
}

export default connect(mapStateToProps)(keydown(FullScreenMode))
