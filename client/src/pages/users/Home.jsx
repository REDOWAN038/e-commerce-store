import Hero from "../../components/Product/Hero"
import NewProducts from "../../components/Product/NewProducts"
import TopProducts from "../../components/Product/TopProducts"

const Home = () => {
    return (
        <div className='flex flex-col gap-16'>
            <Hero />
            <NewProducts />
            <TopProducts />
        </div>
    )
}

export default Home
