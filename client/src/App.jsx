import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import { Home } from "./pages/users/Home"
import SignIn from "./pages/auth/SignIn"
import ProtectedRoute from "./protection/ProtectedRoutes"
import SignUp from "./pages/auth/SignUp"
import Profile from "./pages/users/Profile"
import UserLists from "./pages/admin/UserLists"
import Categories from "./pages/admin/Categories"
import AddProduct from "./pages/admin/AddProduct"
import UpdateProduct from "./pages/admin/UpdateProduct"
import AllProducts from "./pages/admin/AllProducts"
import Product from "./pages/users/Product"
import Cart from "./pages/users/Cart"
import Shop from "./pages/users/Shop"
import CheckOut from "./pages/users/CheckOut"
import Payment from "./pages/users/Payment"
import MyOrders from "./pages/users/MyOrders"
import AllOrders from "./pages/admin/AllOrders"
import DashBoard from "./pages/admin/DashBoard"

const LayoutWrapper = ({ children }) => <Layout>{children}</Layout>

const routes = [
    { path: "/", element: <Home /> },
    { path: "/product/details/:slug", element: <Product /> },
    { path: "/cart", element: <Cart /> },
    { path: "/shop", element: <Shop /> },
    { path: "/signin", element: <SignIn />, access: "unauthorized" },
    { path: "/signup", element: <SignUp />, access: "unauthorized" },
    { path: "/profile", element: <Profile />, access: "authorized" },
    { path: "/checkout", element: <CheckOut />, access: "authorized" },
    { path: "/payment/:id", element: <Payment />, access: "authorized" },
    { path: "/my-orders", element: <MyOrders />, access: "authorized" },
    { path: "/admin/users", element: <UserLists />, access: "admin" },
    { path: "/admin/dashboard", element: <DashBoard />, access: "admin" },
    { path: "/admin/orders", element: <AllOrders />, access: "admin" },
    { path: "/admin/category", element: <Categories />, access: "admin" },
    { path: "/admin/products", element: <AllProducts />, access: "admin" },
    { path: "/admin/add-product", element: <AddProduct />, access: "admin" },
    {
        path: "/admin/update-product/:slug",
        element: <UpdateProduct />,
        access: "admin",
    },
]

const App = () => {
    return (
        <Router>
            <Routes>
                {routes.map(({ path, element, access }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            access ? (
                                <ProtectedRoute accessBy={access}>
                                    <LayoutWrapper>{element}</LayoutWrapper>
                                </ProtectedRoute>
                            ) : (
                                <LayoutWrapper>{element}</LayoutWrapper>
                            )
                        }
                    />
                ))}
            </Routes>
        </Router>
    )
}

export default App
