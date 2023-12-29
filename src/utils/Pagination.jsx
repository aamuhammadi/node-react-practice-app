/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

function Pagination({
  paginationData,
  setPaginationData,
  setNextPageCount,
  pageSize,
  lastPageItemsCount,
}) {
  const [totalPages, setTotalPages] = useState([]);

  const handlePrevious = () => {
    setNextPageCount(pageSize);
    setPaginationData({
      ...paginationData,
      currentPage: paginationData.currentPage - 1,
    });
  };
  const handleNext = () => {
    setPaginationData({
      ...paginationData,
      currentPage: paginationData.currentPage + 1,
    });
  };
  const handleFirst = () => {
    setNextPageCount(pageSize);
    setPaginationData({ ...paginationData, currentPage: 1 });
  };
  const handleLast = () => {
    setNextPageCount(lastPageItemsCount);
    setPaginationData({ ...paginationData, currentPage: totalPages.length });
  };
  const handlePageChange = (cp) => {
    if (totalPages.length === cp) {
      setNextPageCount(lastPageItemsCount);
    } else {
      setNextPageCount(pageSize);
    }
    setPaginationData({ ...paginationData, currentPage: cp });
  };

  const forFirst = paginationData.currentPage <= 1;
  const forLast = paginationData.currentPage >= totalPages.length;

  const condition = (i) => {
    return (
      [i + 2, i, i + 1].includes(paginationData.currentPage) ||
      (forFirst && paginationData.currentPage === i - 1) ||
      (paginationData.currentPage === totalPages.length &&
        paginationData.currentPage === i + 3)
    );
  };

  function cursorCondition(condition) {
    return condition ? "cursor-not-allowed" : "cursor-pointer";
  }

  useEffect(() => {
    const a = [];
    for (let i = 0; i < paginationData.totalPages; i++) {
      a.push(i + 1);
    }
    setTotalPages(a);
  }, [paginationData.totalPages]);

  return (
    <>
      <div className="card-footer">
        <div aria-label="Page navigation" className="pt-3 mt-1">
          <ul className="pagination gap-2 justify-content-end m-0">
            <li className="page-item">
              <a
                className={`page-link ${cursorCondition(forFirst)}`}
                onClick={() => {
                  !forFirst && handleFirst();
                }}
              >
                <span aria-hidden="true">
                  <i class="bi bi-chevron-double-left"></i>
                </span>
              </a>
            </li>
            <li className="page-item">
              <a
                className={`page-link ${cursorCondition(forFirst)}`}
                onClick={() => {
                  !forFirst && handlePrevious();
                }}
              >
                <span aria-hidden="true">
                  <i className="bi bi-chevron-left" />
                </span>
              </a>
            </li>
            {totalPages.map((_, i) => (
              <>
                {condition(i) && (
                  <li className={`page-item`}>
                    <a
                      className={`page-link cursor-pointer ${
                        i + 1 === paginationData.currentPage && "active"
                      }`}
                      onClick={() => {
                        handlePageChange(i + 1);
                      }}
                    >
                      {i + 1}
                    </a>
                  </li>
                )}
              </>
            ))}

            <li className="page-item">
              <a
                className={`page-link ${cursorCondition(forLast)}`}
                onClick={() => {
                  !forLast && handleNext();
                }}
              >
                <span aria-hidden="true">
                  <i className="bi bi-chevron-right" />
                </span>
              </a>
            </li>
            <li className="page-item">
              <a
                className={`page-link ${cursorCondition(forLast)}`}
                onClick={() => {
                  !forLast && handleLast();
                }}
              >
                <span aria-hidden="true">
                  <i class="bi bi-chevron-double-right"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Pagination;
