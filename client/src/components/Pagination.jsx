const Pagination = ({ totalPages, onPageClick, currentPage }) => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='flex items-center justify-center mt-8 join'>
            {pageNumbers.map((idx, i) => (
                <button
                    className={`join-item btn border border-black ${
                        currentPage === i + 1 ? "bg-sky-500" : "bg-sky-100 "
                    }`}
                    key={idx}
                    onClick={() => onPageClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination
