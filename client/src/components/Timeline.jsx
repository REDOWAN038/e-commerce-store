const Timeline = ({ class1 = "", class2 = "", fill1 = "", fill2 = "" }) => {
    return (
        <>
            <ul className='timeline'>
                <li>
                    <div className='timeline-start timeline-box'>Items</div>
                    <div className='timeline-middle'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='text-primary h-5 w-5'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                    <hr className={class1} />
                </li>
                <li>
                    <hr className={class1} />
                    <div className='timeline-start timeline-box'>Shipping</div>
                    <div className='timeline-middle'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill={fill1}
                            className='text-primary h-5 w-5'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                    <hr className={class2} />
                </li>
                <li>
                    <hr className={class2} />
                    <div className='timeline-start timeline-box'>Payment</div>
                    <div className='timeline-middle'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill={fill2}
                            className='text-primary h-5 w-5'
                        >
                            <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Timeline
