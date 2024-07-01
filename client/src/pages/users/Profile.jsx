import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../utils/toast"
import UserForm from "../../form/UserForm/UserForm"

const Profile = () => {
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getUserInfo = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setUserData(res?.data?.payload?.user)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleSave = async (userData) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users`,
                userData,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setIsLoading(false)
                showToast("updated successfully", "success")
                window.location.reload()
            }
        } catch (error) {
            setIsLoading(false)
            if (
                error?.response?.status === 401 ||
                error?.response?.status === 404
            ) {
                showToast(error?.response?.data?.message, "error")
                navigate("/signin")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserInfo()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <UserForm
                onSave={handleSave}
                user={userData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </>
    )
}

export default Profile
