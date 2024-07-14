import { useDispatch, useSelector } from "react-redux"
import { selectBrands } from "../features/filter/selector"
import { setBrands } from "../features/filter/filterSlice"

const BrandFilter = ({ brands }) => {
    const selectedBrands = useSelector(selectBrands)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        // const brand = e.target.value
        // dispatch(setBrands(brand))
        const brand = e.target.value
        const updatedBrands = e.target.checked
            ? [...selectedBrands, brand]
            : selectedBrands.filter((prevBrand) => prevBrand !== brand)
        dispatch(setBrands(updatedBrands))
    }

    return (
        <div className='border-b border-slate-300 pt-5 pb-5'>
            <h4 className='text-sm lg:text-base font-semibold mb-2'>Brands</h4>
            <div className='grid grid-cols-2 lg:grid-cols-1'>
                {brands?.map((brand, idx) => (
                    <label key={idx} className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            className='rounded'
                            value={brand}
                            checked={selectedBrands.includes(brand)}
                            onChange={handleChange}
                        />
                        <span className='text-sm lg:text-base'>{brand}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default BrandFilter
