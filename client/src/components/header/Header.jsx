import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../features/auth/selector"
import UserLoggedIn from "./UserLoggedIn"
import UserNotLoggedIn from "./UserNotLoggedIn"

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return isLoggedIn ? <UserLoggedIn /> : <UserNotLoggedIn />
}

export default Header
