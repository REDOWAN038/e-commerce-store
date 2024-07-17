const Pagination = ({ totalPages, onPageClick, currentPage }) => {
    const handleFirstPage = () => {
        onPageClick(1)
    }

    const handleLastPage = () => {
        onPageClick(totalPages)
    }

    const handlePrevPage = () => {
        onPageClick(currentPage - 1)
    }
    const handleNextPage = () => {
        onPageClick(currentPage + 1)
    }

    const getVisiblePageNumbers = () => {
        const visiblePages = 5
        const pages = []

        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
        let endPage = Math.min(totalPages, startPage + visiblePages - 1)

        if (endPage - startPage < visiblePages - 1) {
            startPage = Math.max(1, endPage - visiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const visiblePageNumbers = getVisiblePageNumbers()

    return (
        <div className='flex items-center justify-center mt-8 join'>
            {currentPage !== 1 && (
                <button
                    className='join-item btn border border-black bg-sky-100 '
                    onClick={handleFirstPage}
                >
                    First
                </button>
            )}
            {currentPage !== 1 && (
                <button
                    className='join-item btn border border-black bg-sky-100 '
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
            )}
            {visiblePageNumbers.map((pageNumber) => (
                <button
                    className={`join-item btn border border-black ${
                        currentPage === pageNumber
                            ? "bg-sky-500"
                            : "bg-sky-100 "
                    }`}
                    key={pageNumber}
                    onClick={() => onPageClick(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            {currentPage !== totalPages && (
                <button
                    className='join-item btn border border-black bg-sky-100 '
                    onClick={handleNextPage}
                >
                    Next
                </button>
            )}
            {currentPage !== totalPages && (
                <button
                    className='join-item btn border border-black bg-sky-100 '
                    onClick={handleLastPage}
                >
                    Last
                </button>
            )}
        </div>
    )
}

export default Pagination
