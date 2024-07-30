import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ProtectedRoute from "./protection/ProtectedRoutes"
import ErrorBoundary from "./components/ErrorBoundary"
import Loading from "./components/Loading"

const Home = lazy(() => import("./pages/users/Home"))
const SignIn = lazy(() => import("./pages/auth/SignIn"))
const SignUp = lazy(() => import("./pages/auth/SignUp"))
const Profile = lazy(() => import("./pages/users/Profile"))
const UserLists = lazy(() => import("./pages/admin/UserLists"))
const Categories = lazy(() => import("./pages/admin/Categories"))
const AddProduct = lazy(() => import("./pages/admin/AddProduct"))
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"))
const AllProducts = lazy(() => import("./pages/admin/AllProducts"))
const Product = lazy(() => import("./pages/users/Product"))
const Cart = lazy(() => import("./pages/users/Cart"))
const Shop = lazy(() => import("./pages/users/Shop"))
const CheckOut = lazy(() => import("./pages/users/CheckOut"))
const Payment = lazy(() => import("./pages/users/Payment"))
const MyOrders = lazy(() => import("./pages/users/MyOrders"))
const AllOrders = lazy(() => import("./pages/admin/AllOrders"))
const DashBoard = lazy(() => import("./pages/admin/DashBoard"))

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
            <Suspense fallback={<Loading />}>
                <ErrorBoundary>
                    <Routes>
                        {routes.map(({ path, element, access }) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    access ? (
                                        <ProtectedRoute accessBy={access}>
                                            <LayoutWrapper>
                                                {element}
                                            </LayoutWrapper>
                                        </ProtectedRoute>
                                    ) : (
                                        <LayoutWrapper>{element}</LayoutWrapper>
                                    )
                                }
                            />
                        ))}
                    </Routes>
                </ErrorBoundary>
            </Suspense>
        </Router>
    )
}

export default App
