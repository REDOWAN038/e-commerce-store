import { useState } from "react"
import { useForm } from "react-hook-form"
import divisionDistrictData from "../../utils/divisionDistrictData"

const ShippingForm = ({ onSave }) => {
    const { register, handleSubmit } = useForm()
    const [selectedDivision, setSelectedDivision] = useState("")
    const [districts, setDistricts] = useState([])

    const handleDivisionChange = (event) => {
        const selectedDivision = event.target.value
        setSelectedDivision(selectedDivision)
        setDistricts(divisionDistrictData[selectedDivision] || [])
    }

    const onSubmit = async (data) => {
        onSave(data)
    }

    return (
        <div className='flex items-center justify-center mt-16'>
            <div className='card bg-base-100 shadow-2xl w-2/3 lg:w-2/5'>
                <h1 className='flex justify-center mt-5 text-3xl'>
                    Shipping Details
                </h1>
                <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
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
                            <span className='label-text'>Mobile Number</span>
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
                    {/* method */}
                    <div className='form-controle'>
                        <label className='label'>
                            <span className='label-text'>Payment Method</span>
                        </label>
                        <input
                            type='radio'
                            className='form-radio'
                            name='paymentMethod'
                            value='PayPal'
                            required
                            {...register("paymentMethod")}
                        />

                        <span className='ml-2'>PayPal</span>
                    </div>
                    <div className='flex items-center justify-center mt-10'>
                        <button className='btn btn-primary'>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingForm
