import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

const mapStateToProps = ({}) => ({
})

const Result = ({}) => (
  <div>
    出席確認は終了しました。
  </div>
)

export default connect(mapStateToProps)(Result)