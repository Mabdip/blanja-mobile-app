
const bagReducer = (
    prevstate = {
        mybag: [],
        myOrder: [],
        totalAmmount: 0,
        totalPayment: 0,
        trxId: Math.floor( (Math.random() * 10000000) + 1)
    }, action) => {

    switch (action.type) {
        case "ADD_ITEMS":
            console.log(action.data.product_id)
            let newItem = action.data
            const inCart = prevstate.mybag.find(({ product_id, color, size }) =>
                product_id === newItem.product_id && color === newItem.color && size === newItem.size ? true : false
            )
            console.log(inCart)
            return {
                ...prevstate,
                mybag: inCart ?
                    prevstate.mybag.map((items) =>
                        items.product_id === newItem.product_id && items.color === newItem.color && items.size === newItem.size ?
                            { ...items, qty: items.qty + 1 }
                            : items
                    )
                    : [...prevstate.mybag, { ...action.data }],
                totalAmmount: inCart ? prevstate.totalAmmount + (newItem.price) : prevstate.totalAmmount + (newItem.qty * newItem.price)

            }
        case "INC_QTY":
            const IncreaseQty = prevstate.mybag.map((items) =>
                items.product_id == action.data.product_id && items.color === action.data.color && items.size === action.data.size ?
                    { ...items, qty: items.qty + 1 }
                    : items
            )
            return {
                ...prevstate,
                mybag: IncreaseQty,
                totalAmmount: prevstate.totalAmmount + action.data.price
            }

        case "DEC_QTY":
            const DecreaseQty = prevstate.mybag.map((items) =>
                items.product_id == action.data.product_id && items.color === action.data.color && items.size === action.data.size ?
                    { ...items, qty: items.qty - 1 }
                    : items
            )
            return {
                ...prevstate,
                mybag: DecreaseQty,
                totalAmmount: prevstate.totalAmmount - action.data.price
            }

        case 'ORDER_ITEMS':
            return {
                ...prevstate,
                mybag:
                    prevstate.mybag.map((items) =>
                        true ?
                            { ...items, payment: action.data.payment, address: action.data.address, trxId: action.data.trxId }
                            : items
                    ),
                trxId: prevstate.trxId + 1
            }
        case "DELETE_ITEM":
            const itemAfterRemove = prevstate.mybag.filter((items) => {
                return items.product_id != action.data.product_id || items.color != action.data.color || items.size != action.data.size
            })
            return {
                ...prevstate,
                mybag: itemAfterRemove,
                totalAmmount: prevstate.totalAmmount - action.data.price
            }
        case "TOTAL_PAYMENT":
            return {
                totalPayment: prevstate.totalPayment + action.data
            }
        case "EMPTY_BAG":
            return {
                ...prevstate,
                mybag: [],
                myOrder: [],
                totalAmmount: 0,
                totalPayment: 0,
            }
        default:
            return {
                ...prevstate,
            };
    }

}

export default bagReducer;