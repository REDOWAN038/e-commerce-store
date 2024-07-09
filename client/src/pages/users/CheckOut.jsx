import { useState } from "react"
import { useForm } from "react-hook-form"
import divisionDistrictData from "../../utils/divisionDistrictData"
import CheckoutSummary from "../../components/CheckoutSummary"

const CheckOut = () => {
    const { register, handleSubmit } = useForm()
    const [selectedDivision, setSelectedDivision] = useState("")
    const [districts, setDistricts] = useState([])

    const handleDivisionChange = (event) => {
        const selectedDivision = event.target.value
        setSelectedDivision(selectedDivision)
        setDistricts(divisionDistrictData[selectedDivision] || [])
    }

    const onSubmit = async (data) => {
        console.log("order ", data)
    }

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* shipping address */}
            <div className='flex flex-col bg-base-100 shadow-xl w-11/12 lg:w-8/12 mx-auto gap-6 px-10 py-5 mt-10'>
                <div className='w-full'>
                    <h1 className='flex justify-center mt-5 text-3xl'>
                        Shipping Address
                    </h1>
                    <form
                        className='card-body'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* name */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Name</span>
                            </label>
                            <input
                                type='text'
                                placeholder='name'
                                className='input input-bordered'
                                required
                                {...register("name")}
                            />
                        </div>
                        {/* mobile */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Mobile Number
                                </span>
                            </label>
                            <input
                                type='tel'
                                pattern='01[0-9]{9}'
                                placeholder='01XXXXXXXXX'
                                className='input input-bordered'
                                required
                                {...register("phone")}
                            />
                        </div>
                        {/* divisions */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Division</span>
                            </label>
                            <select
                                className='select select-bordered w-full max-w-xs'
                                required
                                {...register("division")}
                                value={selectedDivision}
                                onChange={handleDivisionChange}
                            >
                                <option value=''>Select a division</option>
                                {Object.keys(divisionDistrictData).map(
                                    (division, idx) => (
                                        <option key={idx} value={division}>
                                            {division}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        {/* districts */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>District</span>
                            </label>
                            <select
                                className='select select-bordered w-full max-w-xs'
                                required
                                {...register("district")}
                            >
                                <option value=''>Select a district</option>
                                {districts.map((district, idx) => (
                                    <option key={idx} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* address. */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Address</span>
                            </label>
                            <textarea
                                placeholder='Address...'
                                className='textarea textarea-bordered textarea-md w-full'
                                required
                                {...register("address")}
                            ></textarea>
                        </div>
                        <div className='flex items-center justify-center mt-10'>
                            <button className='btn btn-primary'>
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* checkout summary */}
            <div className='flex flex-col space-y-4 bg-white shadow-sm w-11/12 lg:w-3/12 h-fit mx-auto px-10 py-5 mt-10'>
                <CheckoutSummary />
            </div>
        </div>
    )
}

export default CheckOut
