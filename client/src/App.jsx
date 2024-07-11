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

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path='/product/details/:slug'
                    element={
                        <Layout>
                            <Product />
                        </Layout>
                    }
                />
                <Route
                    path='/cart'
                    element={
                        <Layout>
                            <Cart />
                        </Layout>
                    }
                />
                <Route
                    path='/shop'
                    element={
                        <Layout>
                            <Shop />
                        </Layout>
                    }
                />
                <Route
                    path='/signin'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <Layout>
                                <SignIn />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <Layout>
                                <SignUp />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <Profile />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/checkout'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <CheckOut />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/payment/:id'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <Payment />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/my-orders'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <MyOrders />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/users'
                    element={
                        <ProtectedRoute accessBy='admin'>
                            <Layout>
                                <UserLists />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/orders'
                    element={
                        <ProtectedRoute accessBy='admin'>
                            <Layout>
                                <AllOrders />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/category'
                    element={
                        <ProtectedRoute accessBy='admin'>
                            <Layout>
                                <Categories />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/products'
                    element={
                        <ProtectedRoute accessBy='admin'>
                            <Layout>
                                <AllProducts />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/add-product'
                    element={
                        <ProtectedRoute accessBy='admin'>
                            <Layout>
                                <AddProduct />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/update-product/:slug'
                    element={
                        <ProtectedRoute accessBy='admin'>
                            <Layout>
                                <UpdateProduct />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
