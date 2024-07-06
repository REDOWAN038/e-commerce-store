import { useDispatch, useSelector } from "react-redux"
import { selectMaxPrice } from "../features/filter/selector"
import { setMaxPrice } from "../features/filter/filterSlice"

const PriceFilter = () => {
    const selectedPrice = useSelector(selectMaxPrice)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setMaxPrice(parseInt(e.target.value)))
    }

    return (
        <div className='pt-5'>
            <h4 className='text-sm lg:text-base font-semibold mb-2'>
                {" "}
                Max Price($)
            </h4>
            <select
                className='p-2 border rounded-md w-full text-sm lg:text-base'
                value={selectedPrice}
                onChange={handleChange}
            >
                <option value=''>Select Max Price</option>
                {[25, 50, 75, 100, 125, 150, 200, 250, 300].map(
                    (price, idx) => (
                        <option key={idx} value={price}>
                            {price}
                        </option>
                    )
                )}
            </select>
        </div>
    )
}

export default PriceFilter
