let initialState = {
    username: '',
    room: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ON_LOGIN':
            return { ...state, username: action.payload.username, room: action.payload.room }
        default: return state
    }
}

export default userReducer
