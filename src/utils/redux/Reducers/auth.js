const authReducer = (prevState = {
    isLogin: false,
    email: '',
    name: '',
    leve: '',
    id: '',
    token: ''
}, action) => {
    switch (action.type) {
        case "LOGIN_TRUE":
            return {
                ...prevState,
                isLogin: true,
                email: action.data.email,
                name: action.data.name,
                level: action.data.level,
                id: action.data.id,
                token: action.data.token
            };
        case "LOGIN_FALSE":
            return {
                ...prevState,
                isLogin: false,
                email: '',
                name: '',
                id: '',
                token: ''
            };
        case "SET_EMAIL":
            return {
                ...prevState,
                email: action.email
            }
        case "REMOVE_EMAIL":
            return {
                ...prevState,
                email: ''
            }
        default:
            return {
                ...prevState,
            };
    }
}

export default authReducer;