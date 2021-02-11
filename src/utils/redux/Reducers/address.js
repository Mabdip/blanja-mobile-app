const addressReducer = (prevState = {
    activeAddress:null
}, action) => {
    switch (action.type) {
        case "SET_ADDRESS":
            return {
                ...prevState,
                activeAddress:action.data
            };
        default:
            return {
                ...prevState,
            };
    }
}

export default addressReducer;