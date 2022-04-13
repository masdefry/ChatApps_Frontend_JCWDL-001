import React, { Component } from 'react';

export class LoginForm extends Component {

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center m-5'>
                    <div className='col-4'>
                        <div className='border rounded shadow p-5 text-center'>
                            <h3>Login Here</h3>
                            <input type='text' ref={(el) => this.name = el} placeholder='Your Name' className='form-control mt-3'/>
                            <input type='text' ref={(el) => this.room = el} placeholder='Room Name' className='form-control mt-3'/>
                            <input type='button' value='Submit' className='w-100 btn btn-primary mt-3'  />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm