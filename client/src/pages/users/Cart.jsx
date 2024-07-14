import { FaRegTrashAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {
    selectCartItems,
    selectItemsPrice,
    selectShippingPrice,
    selectTaxPrice,
    selectTotalPrice,
} from "../../features/cart/selector"
import { selectUser } from "../../features/auth/selector"
import { Link } from "react-router-dom"
import { addToCart, removeFromCart } from "../../features/cart/cartSlice"
import { showToast } from "../../utils/toast"
import CheckoutSummary from "../../components/CheckoutSummary"
import Timeline from "../../components/Timeline"

const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const itemsPrice = useSelector(selectItemsPrice)
    const taxPrice = useSelector(selectTaxPrice)
    const shippingPrice = useSelector(selectShippingPrice)
    const totalPrice = useSelector(selectTotalPrice)
    const user = useSelector(selectUser)

    const getTotal = (price, quantity) => {
        return price * quantity
    }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId))
        showToast("Product Remove from Cart", "success")
    }

    return (
        <div className='flex flex-col space-y-2 mt-10'>
            {!user?.isAdmin && (
                <div className='flex mx-auto'>
                    <Timeline />
                </div>
            )}
            <div className='flex flex-col space-y-10 lg:space-y-0 lg:flex-row w-full lg:w-11/12 lg:mx-auto'>
                {/* about product */}
                <div className='flex flex-col bg-white shadow-lg w-11/12 lg:w-7/12 mx-auto gap-6 px-10 py-5 rounded-lg'>
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
                            <div className='flex gap-6 md:gap-3'>
                                <div className='avatar'>
                                    <div className='w-48 md:w-40 lg:w-32 rounded'>
                                        <img src={item.images[0]} />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <Link to={`/product/details/${item.slug}`}>
                                        <h2 className='text-sm md:text-base card-title'>
                                            {item.name}
                                        </h2>
                                    </Link>
                                    <p className='text-sm md:text-base text-red-950'>
                                        {item.brand}
                                    </p>
                                    <h2 className='text-sm md:text-base card-title lg:hidden'>
                                        $
                                        {getTotal(
                                            item.price,
                                            item.orderQuantity
                                        )}
                                    </h2>
                                    <FaRegTrashAlt
                                        className='text-sm md:text-base cursor-pointer'
                                        onClick={() =>
                                            handleRemoveFromCart(item._id)
                                        }
                                    />
                                    <p className='text-sm md:text-base text-red-500'>{`Only ${item.quantity} items left`}</p>
                                    <input
                                        type='number'
                                        min={1}
                                        max={item.quantity}
                                        className='md:hidden input input-bordered input-sm w-36'
                                        value={item.orderQuantity}
                                        onChange={(e) =>
                                            dispatch(
                                                addToCart({
                                                    ...item,
                                                    orderQuantity:
                                                        e.target.value,
                                                })
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            {/* amount */}
                            <input
                                type='number'
                                min={1}
                                max={item.quantity}
                                className='hidden md:flex input input-bordered w-36'
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
                            <h2 className='card-title hidden lg:flex'>
                                ${getTotal(item.price, item.orderQuantity)}
                            </h2>
                        </div>
                    ))}
                    <Link to='/checkout'>
                        <button className='btn btn-primary w-full'>
                            Proceed to CheckOut
                        </button>
                    </Link>
                </div>
                {/* checkout summary */}
                <div className='flex flex-col space-y-4 bg-white shadow-lg w-11/12 lg:w-4/12 h-fit mx-auto px-10 py-5 rounded-lg'>
                    <h1 className='card-title border-b-2 pb-4'>
                        Checkout Summary
                    </h1>
                    <CheckoutSummary
                        itemsPrice={itemsPrice}
                        taxPrice={taxPrice}
                        shippingPrice={shippingPrice}
                        totalPrice={totalPrice}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cart
