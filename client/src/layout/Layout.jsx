import Footer from "../components/Footer"
import Header from "../components/header/Header"

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='py-10 bg-slate-100'>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
