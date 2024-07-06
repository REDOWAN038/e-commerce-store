import { FaRegTrashAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {
    selectCartItems,
    selectItemsPrice,
    selectShippingPrice,
    selectTaxPrice,
    selectTotalPrice,
} from "../../features/cart/selector"
import { Link } from "react-router-dom"
import { addToCart, removeFromCart } from "../../features/cart/cartSlice"
import { showToast } from "../../utils/toast"

const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const itemsPrice = useSelector(selectItemsPrice)
    const shippingPrice = useSelector(selectShippingPrice)
    const taxPrice = useSelector(selectTaxPrice)
    const totalPrice = useSelector(selectTotalPrice)

    const getTotal = (price, quantity) => {
        return price * quantity
    }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId))
        showToast("Product Remove from Cart", "success")
    }

    return (
        <div className='flex'>
            {/* about product */}
            <div className='flex flex-col bg-white shadow-sm w-8/12 mx-auto gap-6 px-10 py-5 mt-10'>
                <div className='flex items-center justify-between pb-4 border-b-2'>
                    <h2 className='card-title'>{`Total Items : (${cartItems.length})`}</h2>
                    <h2 className='text-xl text-green-700'>{`Your Total : $${itemsPrice}`}</h2>
                </div>
                {cartItems.map((item, idx) => (
                    <div
                        key={idx}
                        className='flex items-center justify-between border-b-2 pb-4'
                    >
                        {/* image and info */}
                        <div className='flex gap-3'>
                            <div className='avatar'>
                                <div className='w-32 rounded'>
                                    <img src={item.images[0]} />
                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <Link to={`/product/details/${item.slug}`}>
                                    <h2 className='card-title'>{item.name}</h2>
                                </Link>
                                <p className=' text-red-950'>{item.brand}</p>
                                <FaRegTrashAlt
                                    className='cursor-pointer'
                                    onClick={() =>
                                        handleRemoveFromCart(item._id)
                                    }
                                />
                                <p className=' text-red-500'>{`Only ${item.quantity} items left`}</p>
                            </div>
                        </div>
                        {/* amount */}
                        <input
                            type='number'
                            min={1}
                            max={item.quantity}
                            className='input input-bordered w-36'
                            value={item.orderQuantity}
                            onChange={(e) =>
                                dispatch(
                                    addToCart({
                                        ...item,
                                        orderQuantity: e.target.value,
                                    })
                                )
                            }
                        />
                        {/* total */}
                        <h2 className='card-title'>
                            ${getTotal(item.price, item.orderQuantity)}
                        </h2>
                    </div>
                ))}
                <Link to='/shipping'>
                    <button className='btn btn-primary'>
                        Proceed to CheckOut
                    </button>
                </Link>
            </div>
            {/* checkout summary */}
            <div className='flex flex-col space-y-4 bg-white shadow-sm w-3/12 h-fit mx-auto px-10 py-5 mt-10'>
                <h1 className='card-title border-b-2 pb-4'>Checkout Summary</h1>
                <div className='flex items-center justify-between'>
                    <h2>Subotal</h2>
                    <h2>{itemsPrice}</h2>
                </div>
                <div className='flex items-center justify-between'>
                    <h2>Shipping</h2>
                    <h2>{shippingPrice}</h2>
                </div>
                <div className='flex items-center justify-between'>
                    <h2>Tax</h2>
                    <h2>{taxPrice}</h2>
                </div>
                <div className='flex items-center justify-between'>
                    <h2 className='card-title'>Total</h2>
                    <h2>{totalPrice}</h2>
                </div>
            </div>
        </div>
    )
}

export default Cart
