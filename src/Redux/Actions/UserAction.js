export const onUserLogin = (username, room) => {
    return(dispatch) => {
        dispatch(
            {
                type: 'ON_LOGIN',
                payload: { username, room }
            }
        )
    }
}