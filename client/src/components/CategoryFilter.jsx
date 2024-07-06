import { useDispatch, useSelector } from "react-redux"
import { selectCategories } from "../features/filter/selector"
import { setCategories } from "../features/filter/filterSlice"

const CategoryFilter = ({ categories }) => {
    const selectedCategories = useSelector(selectCategories)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const category = e.target.value
        const updatedCategories = e.target.checked
            ? [...selectedCategories, category]
            : selectedCategories.filter(
                  (prevCategory) => prevCategory !== category
              )
        dispatch(setCategories(updatedCategories))
    }

    return (
        <div className='border-b border-slate-300 pb-5'>
            <h4 className='text-sm lg:text-base font-semibold mb-2'>
                Categories
            </h4>
            <div className='grid grid-cols-2 lg:grid-cols-1'>
                {categories?.map((category, idx) => (
                    <label key={idx} className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            className='rounded'
                            value={category?._id}
                            checked={selectedCategories.includes(category?._id)}
                            onChange={handleChange}
                        />
                        <span className='text-sm lg:text-base'>
                            {category?.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CategoryFilter
