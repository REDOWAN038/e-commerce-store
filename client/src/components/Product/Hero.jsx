import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div
            className='hero min-h-screen'
            style={{
                backgroundImage: `url(${import.meta.env.VITE_HERO_URL})`,
            }}
        >
            <div className='hero-overlay bg-opacity-60'></div>
            <div className='hero-content text-neutral-content text-center'>
                <div className='max-w-md'>
                    <h1 className='mb-5 text-5xl font-bold'>Hello there</h1>
                    <p className='mb-5'>
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <Link to='/shop'>
                        <button className='btn btn-primary'>
                            Start Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero
