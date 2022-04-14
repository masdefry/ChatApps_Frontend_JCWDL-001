import React from 'react';
import { connect } from 'react-redux';

export class ChatRoom extends React.Component {

    state = {
        message: [],
        usersMessage: [],
        usersTypingMessage: [],
        usersOnline: null
    }

    componentDidMount(){
        let arrMessage = this.state.message
        this.props.socket.on('message-from-server', (data) => {
            arrMessage.push(data)
            this.setState({message: arrMessage})
        })

        this.props.socket.emit('users-online', this.props.user.room)
        this.props.socket.on('users-online', (data) => {
            this.setState({usersOnline: data})
        })

        this.props.socket.on('send-message-back', (data) => {
            // Step1. Update users message
            let arrUsersMessage = this.state.usersMessage
            arrUsersMessage.push(data)

            // Step2. Hapus data user dari dala, typing message -> User yang berhasil send message
            let arrUsersTypingMessage = this.state.usersTypingMessage
            let index = null 
            arrUsersTypingMessage.forEach((value, idx) => {
                if(value.from === data.from){
                    index = idx
                }
            })
            if(index !== null){
                arrUsersTypingMessage.splice(index, 1)
                this.setState({usersTypingMessage: arrUsersTypingMessage})
            }

            this.setState({usersMessage: arrUsersMessage})
        })

        this.props.socket.on('typing-message-back', (data) => {
            let arrUsersTypingMessage = this.state.usersTypingMessage

            if(data.message.length > 0){
                let index = null 

                arrUsersTypingMessage.forEach((value, idx) => {
                    if(value.from === data.from){
                        index = idx 
                    }
                })

                if(index === null){
                    arrUsersTypingMessage.push({ from: data.from })
                    this.setState({usersTypingMessage: arrUsersTypingMessage})
                }
            }else if(data.message.length === 0){
                let index = null 

                arrUsersTypingMessage.forEach((value, idx) => {
                    if(value.from === data.from){
                        index = idx
                    }
                })

                if(index !== null){
                    arrUsersTypingMessage.splice(index, 1)
                    this.setState({usersTypingMessage: arrUsersTypingMessage})
                }
            }
        })
    }

    onSendMessage = () => {
        let data = {
            message: this.message.value
        }

        this.props.socket.emit('send-message', data)
    }

    onTyping = () => {
        let data = {
            message: this.message.value 
        }

        this.props.socket.emit('typing-message', data)
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className='border rounded-0 shadow' style={{height : "670px", overflow: "auto", position: "relative"}} >
                            <div className='bg-primary text-white p-3' style={{position: "sticky", top: "0px", right: "0px", left: "0px"}}>
                                User Online : 
                                {
                                    this.state.usersOnline?
                                        this.state.usersOnline.map(value => {
                                            return `${value.username}`
                                        })
                                    :
                                        null
                                }
                            </div>
                            {
                                this.state.message?
                                    this.state.message.map((val) => {
                                        return(
                                            <div className="alert alert-warning rounded-0 text-center mx-3 mt-3 mb-5" >
                                                {val.message}
                                            </div>
                                        )
                                    })
                                :
                                    null
                            }
                            {
                                this.state.usersMessage?
                                    this.state.usersMessage.map((value) => {
                                        if(value.from === this.props.user.username){
                                            return(
                                                <div className="row justify-content-end mx-1">
                                                    <div className="px-2 py-2 mx-3 mb-3 rounded bg-primary" style={{display: "inline-block"}}>
                                                        {value.message}
                                                    </div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div className="row justify-content-start mx-1">
                                                    {value.from} :
                                                    <div className="px-2 py-2 mx-3 mb-3 rounded border border-primary" style={{display: "inline-block"}}>
                                                        {value.message}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                :
                                    null
                            }
                            {
                                this.state.usersTypingMessage?
                                    this.state.usersTypingMessage.map((value) => {
                                        return(
                                            <div className="row justify-content-start mx-1">
                                                <div className="px-2 py-2 mx-3 mb-3 rounded border border-primary" style={{display: "inline-block"}}>
                                                    {value.from} Typing Message 

                                                    <div className='spinner-grow text-primary' style={{ width: '5px', height: '5px' }} />
                                                    <div className='spinner-grow text-primary' style={{ width: '5px', height: '5px' }} />
                                                    <div className='spinner-grow text-primary' style={{ width: '5px', height: '5px' }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                    null
                            }
                            <div style={{position: "fixed", left: "499px", bottom: "0px", right: "499px"}} className='p-4 bg-primary d-flex justfy-content-between'>
                                <input type='text'  ref={(e) => this.message = e} onChange={this.onTyping} className='form-control rounded-0 w-100'  />
                                <input type='button' onClick={() => this.onSendMessage()}  className='btn btn-warning rounded-0' value='Send' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ChatRoom)
