const notifReducer = (prevState = {
    notify:[]
}, action) => {
    switch (action.type) {
        case "ADD_NOTIF":
            console.log('berhasilkah?')
            return {
                ...prevState,
                notify: [...prevState.notify, action.data]
            };
        default:
            return {
                ...prevState,
            };
    }
}

export default notifReducer;