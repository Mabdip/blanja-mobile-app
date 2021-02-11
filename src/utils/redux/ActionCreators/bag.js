export const addItems = (data) => {
    return {
        type: "ADD_ITEMS",
        data

    }
}

export const addQty = (data) => {
    return {
        type: "INC_QTY",
        data

    }
}

export const minQty = (data) => {
    return {
        type: "DEC_QTY",
        data

    }
}

export const orderItems = (data) => {
    return {
        type: "ORDER_ITEMS",
        data

    }
}

export const removeItems = (data) => {
    return {
        type: "DELETE_ITEM",
        data

    }
}

export const setTotalPayment = (data) =>{
    return {
        type: "TOTAL_PAYMENT",
        data
    }
}

export const setEmptyBag = () =>{
    return {
        type: "EMPTY_BAG"
    }
}