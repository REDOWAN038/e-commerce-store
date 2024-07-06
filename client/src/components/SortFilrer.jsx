import { useDispatch, useSelector } from "react-redux"
import { selectSortOption } from "../features/filter/selector"
import { setSortOption } from "../features/filter/filterSlice"

const SortFilter = () => {
    const sortOption = useSelector(selectSortOption)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setSortOption(e.target.value))
    }

    return (
        <>
            <select
                value={sortOption}
                onChange={handleChange}
                className='p-2 border rounded-md w-1/2 lg:w-full'
            >
                <option value=''>Sort By</option>
                <option value='rating'>Top Rated</option>
                <option value='priceAsc'>Price (low to high)</option>
                <option value='priceDesc'>Price (high to low)</option>
            </select>
        </>
    )
}

export default SortFilter
