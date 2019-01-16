import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import App from '../../App'

class SanAlert extends Component {
  constructor(props) {
    super(props);
    this.props = {
       alert: undefined,
       style: undefined,
       options: undefined,
       message: 'heyyy',
       close: 'close'
    };
  }
  render () {
    const { style, options, message, close } = this.props

    return (
      <div style={style}>
        {options.type === 'info' && '!'}
        {options.type === 'success' && ':)'}
        {options.type === 'error' && ':('}
        {message}
        <button onClick={close}>X</button>
      </div>
    )
  }
}
