import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectUser } from "../features/auth/selector"

const ProtectedRoute = ({ children, accessBy }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const user = useSelector(selectUser)

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
    } else if (accessBy === "admin") {
        if (isLoggedIn && user?.isAdmin) {
            return children
        } else {
            return <Navigate to='/signin'></Navigate>
        }
    }
}

export default ProtectedRoute
