const Steps = ({ colors, content }) => {
    return (
        <ul className='steps'>
            <li data-content={content[0]} className={`step mr-8 ${colors[0]}`}>
                Cart
            </li>
            <li data-content={content[1]} className={`step ${colors[1]}`}>
                Checkout
            </li>
            <li data-content={content[2]} className={`step ${colors[2]}`}>
                Payment
            </li>
            <li data-content={content[3]} className={`step ${colors[3]}`}>
                Delivery
            </li>
        </ul>
    )
}

export default Steps
