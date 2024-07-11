import Chart from "react-apexcharts"
import axios from "axios"
import { useEffect, useState } from "react"
import { showToast } from "../../utils/toast"
import AllOrders from "./AllOrders"

const DashBoard = () => {
    const [users, setUsers] = useState([])
    const [sales, setSales] = useState([])
    const [orders, setOrders] = useState([])
    const [salesByDates, setSalesByDates] = useState([])

    const getAllUsers = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/admin/users`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setUsers(res?.data?.payload?.users)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const getAllSales = async () => {
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/admin/order/total-sales`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setSales(res?.data?.payload?.totalSales)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const getAllOrders = async () => {
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/admin/order/total-orders`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setOrders(res?.data?.payload?.totalOrders)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const getAllSalesByDates = async () => {
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/admin/order/total-sales-by-dates`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setSalesByDates(res?.data?.payload?.totalSalesByDate)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const [state, setState] = useState({
        options: {
            chart: {
                type: "line",
            },
            tooltip: {
                theme: "dark",
            },
            colors: ["#00E396"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Sales Trend",
                align: "left",
            },
            grid: {
                borderColor: "#ccc",
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: "Sales", data: [] }],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllUsers()
                await getAllSales()
                await getAllOrders()
                await getAllSalesByDates()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (salesByDates) {
            const formattedSalesByDate = salesByDates.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }))

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesByDate.map((item) => item.x),
                    },
                },

                series: [
                    {
                        name: "Sales",
                        data: formattedSalesByDate.map((item) => item.y),
                    },
                ],
            }))
        }
    }, [salesByDates])

    if (users?.length === 0 && sales?.length === 0 && orders?.length === 0) {
        return (
            <div className='flex items-center justify-center mt-16 h-[380px]'>
                <h1 className='text-lg font-bold text-black'>
                    No Data to Show
                </h1>
            </div>
        )
    }

    return (
        <div className='flex justify-center mt-16 w-11/12 mx-auto'>
            <section className='w-full'>
                <div className='flex justify-around flex-wrap'>
                    <div className='rounded-lg bg-pink-500 text-center p-5 mt-5'>
                        <p className=''>Sales($)</p>
                        <h1 className='text-xl font-bold'>{sales}</h1>
                    </div>
                    <div className='rounded-lg bg-pink-500 text-center p-5 mt-5'>
                        <p className=''>Customers</p>
                        <h1 className='text-xl font-bold'>{users?.length}</h1>
                    </div>
                    <div className='rounded-lg bg-pink-500 text-center p-5 mt-5'>
                        <p className=''>All Orders</p>
                        <h1 className='text-xl font-bold'>{orders}</h1>
                    </div>
                </div>

                <div className='ml-[4rem] lg:ml-[10rem] mt-[4rem]'>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type='bar'
                        width='70%'
                    />
                </div>

                <div className='mt-[4rem]'>
                    <AllOrders />
                </div>
            </section>
        </div>
    )
}

export default DashBoard
