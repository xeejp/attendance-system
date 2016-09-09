import React, { Component } from 'react'
import { connect} from 'react-redux'

import { updateNumber } from './actions'

const mapStateToProps = ({ number }) => ({
  number
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
    const { number } = this.props
    setTimeout(this.handleUpdate.bind(this), 1000)
    return (
      <div>
        <font style={{"font-size": "500", width: "100%"}}>{number[number.length - 1]}</font>
      </div>
    )
  }
}

export default connect(mapStateToProps)(FullScreenMode)

/*

*/