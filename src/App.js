import React from 'react';

import ChatRoom from './Pages/ChatRoom';
import Login from './Pages/Login';

import { connect } from 'react-redux';

import io from 'socket.io-client'
const socket = io('http://localhost:2000')


class App extends React.Component{
  render(){
    if(this.props.user.username === '' && this.props.user.room === ''){
      return(
        <Login socket={socket} />
      )
    }

    return(
      <ChatRoom socket={socket} />
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps, null)(App)