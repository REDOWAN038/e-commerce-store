import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../features/auth/selector"

const ProtectedRoute = ({ children, accessBy }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if (accessBy === "unauthorized") {
        if (!isLoggedIn) {
            return children
        } else {
            return <Navigate to='/'></Navigate>
        }
    } else if (accessBy === "authorized") {
        if (isLoggedIn) {
            return children
        } else {
            return <Navigate to='/signin'></Navigate>
        }
    }
}

export default ProtectedRoute