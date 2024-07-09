import { useSelector } from "react-redux"
import {
    selectItemsPrice,
    selectTaxPrice,
    selectTotalPrice,
} from "../features/cart/selector"

const CheckoutSummary = () => {
    const itemsPrice = useSelector(selectItemsPrice)
    const taxPrice = useSelector(selectTaxPrice)
    const totalPrice = useSelector(selectTotalPrice)

    return (
        <>
            <h1 className='card-title border-b-2 pb-4'>Checkout Summary</h1>
            <div className='flex items-center justify-between'>
                <h2>Subotal</h2>
                <h2>${itemsPrice}</h2>
            </div>
            <div className='flex items-center justify-between'>
                <h2>Shipping</h2>
                <h2>$10</h2>
            </div>
            <div className='flex items-center justify-between'>
                <h2>Tax</h2>
                <h2>${taxPrice}</h2>
            </div>
            <div className='flex items-center justify-between'>
                <h2 className='card-title'>Total</h2>
                <h2 className='card-title'>${totalPrice}</h2>
            </div>
        </>
    )
}

export default CheckoutSummary
