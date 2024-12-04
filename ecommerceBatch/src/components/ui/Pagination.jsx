import React from 'react';
import clsx from 'clsx';
import Button from './Button';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      // 如果总页数小于等于7，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);
      
      if (currentPage <= 3) {
        // 当前页靠近开始
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前页靠近结束
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 当前页在中间
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      <Button
        label="Previous"
        startIcon={RiArrowLeftSLine}
        variant="secondary"
        size="md"
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="mr-2"
      />
      
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center w-10 h-10 text-neutral-600">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded font-medium transition-colors',
                  currentPage === page
                    ? 'bg-indigo-700 text-white'
                    : 'text-neutral-600 hover:bg-neutral-50'
                )}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <Button
        label="Next"
        endIcon={RiArrowRightSLine}
        variant="secondary"
        size="md"
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="ml-2"
      />
    </nav>
  );
};

export default Pagination;