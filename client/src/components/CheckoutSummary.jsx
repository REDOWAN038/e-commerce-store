const CheckoutSummary = ({
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
}) => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <h2>Subotal</h2>
                <h2>${itemsPrice}</h2>
            </div>
            <div className='flex items-center justify-between'>
                <h2>Shipping</h2>
                <h2>${shippingPrice}</h2>
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
