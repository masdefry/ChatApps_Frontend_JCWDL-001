import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onUserLogin } from './../Redux/Actions/UserAction';

export class LoginForm extends Component {

    onSubmitData = () => {
        let username = this.username.value 
        let room = this.room.value 
        
        this.props.socket.emit('user-join', {username, room})
        this.props.socket.on('total-user', (data) => {
            console.log(data)
            if(data <= 4){
                this.props.onUserLogin(username, room)
            }else{
                alert('Room Sudah Penuh!')
            }
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center m-5'>
                    <div className='col-4'>
                        <div className='border rounded shadow p-5 text-center'>
                            <h3>Login Here</h3>
                            <input type='text' ref={(el) => this.username = el} placeholder='Your Username' className='form-control mt-3'/>
                            <input type='text' ref={(el) => this.room = el} placeholder='Your Room Name' className='form-control mt-3'/>
                            <input type='button' value='Submit' onClick={() => this.onSubmitData()} className='w-100 btn btn-primary mt-3'  />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onUserLogin
}

export default connect(null, mapDispatchToProps)(LoginForm)