import React from 'react';

// import ChatRoom from './Pages/ChatRoom';
// import Login from './Pages/Login';

import io from 'socket.io-client'

class App extends React.Component{

  componentDidMount(){
    io('http://localhost:2000')
  }

  render(){
    return(
      <div>
        Chat System
      </div>
    )
  }
}

export default App