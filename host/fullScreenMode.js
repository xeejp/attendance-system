import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateNumber } from './actions'

const mapStateToProps = ({ number }) =>({
  number
})

class fullScreenMode extends Component {
  constructor(props){
    super(props)
  }

  update() {
    const { dispatch } = this.props
    dispatch(updateNumber())
  }
  
  render() {
    const { number } = this.props
//    setTimeout(this.update.bind(this), 1000)
    return (
      <div style={{align: "center"}}>
       <h1>{number[0]}</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps)(fullScreenMode)