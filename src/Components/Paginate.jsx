import React, { useState } from 'react';

function Paginate({ totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage ? 'bg-gray-200' : 'bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return <div className="flex justify-center mt-4">{renderPagination()}</div>;
}

export default Paginate;