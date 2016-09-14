import React, { Component } from 'react'
import { connect} from 'react-redux'

import { updateNumber } from './actions'

const mapStateToProps = ({ number, seconds }) => ({
  number, seconds
})

class FullScreenMode extends Component {
  constructor(props) {
    super(props)
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

export default connect(mapStateToProps)(FullScreenMode)