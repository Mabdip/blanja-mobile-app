export const setLogintrue = (data) => {
    return {
        type: "LOGIN_TRUE",
        data
    }
}

export const setLoginfalse = () => {
    return {
        type: "LOGIN_FALSE",
    }
}

export const setEmail  = (email) =>{
    return {
        type: "SET_EMAIL",
        email
    }
}

export const removeEmail = () =>{
    return {
        type: "REMOVE_EMAIL"
    }
}