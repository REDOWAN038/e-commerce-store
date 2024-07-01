import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectUser } from "../../features/auth/selector"
import UserLoggedIn from "./UserLoggedIn"
import UserNotLoggedIn from "./UserNotLoggedIn"
import AdminLoggedIn from "./AdminLoggedIn"

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const user = useSelector(selectUser)

    return isLoggedIn ? (
        user?.isAdmin ? (
            <AdminLoggedIn />
        ) : (
            <UserLoggedIn />
        )
    ) : (
        <UserNotLoggedIn />
    )
}

export default Header
