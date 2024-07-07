import { Transition } from "@headlessui/react"
import { FiX } from "react-icons/fi"
import CategoryFilter from "../components/CategoryFilter"
import BrandFilter from "../components/BrandFilter"
import PriceFilter from "../components/PriceFilter"

const FilterModal = ({ isOpen, toggleModal, categories, brands }) => {
    return (
        <Transition
            show={isOpen}
            as='div'
            enter='transition ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
        >
            <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-full overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-md font-bold'>Filter by:</h2>
                        <button onClick={toggleModal} className='text-gray-700'>
                            <FiX className='h-6 w-6' />
                        </button>
                    </div>

                    <div className='flex flex-col space-y-5'>
                        <CategoryFilter categories={categories} />
                        <BrandFilter brands={brands} />
                        <PriceFilter />
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export default FilterModal
