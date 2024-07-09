import { useSelector } from "react-redux"
import { selectCartItems } from "../features/cart/selector"

const OrderDetails = () => {
    const cartItems = useSelector(selectCartItems)

    const getTotal = (price, quantity) => {
        return price * quantity
    }

    return (
        <>
            {cartItems?.map((item, idx) => (
                <div key={idx} className='flex items-center justify-between'>
                    <div className='flex items-center gap-1 font-bold'>
                        <h1>{item.name}</h1>
                        <span className='text-sm'>x</span>
                        <span>{item.orderQuantity}</span>
                    </div>
                    <h2 className='font-bold'>
                        ${getTotal(item.price, item.orderQuantity)}
                    </h2>
                </div>
            ))}
        </>
    )
}

export default OrderDetails
