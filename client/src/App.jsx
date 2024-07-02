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
