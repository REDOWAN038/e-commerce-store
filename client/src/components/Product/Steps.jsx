const Steps = ({
    color1 = "",
    color2 = "",
    color3 = "",
    color4 = "",
    content1 = "✕",
    content2 = "✕",
    content3 = "✕",
    content4 = "✕",
}) => {
    return (
        <ul className='steps'>
            <li data-content={content1} className={`step mr-8 ${color1}`}>
                Cart
            </li>
            <li data-content={content2} className={`step ${color2}`}>
                Checkout
            </li>
            <li data-content={content3} className={`step ${color3}`}>
                Payment
            </li>
            <li data-content={content4} className={`step ${color4}`}>
                Delivery
            </li>
        </ul>
    )
}

export default Steps
