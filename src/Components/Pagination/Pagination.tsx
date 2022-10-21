import React from 'react';
import { TableProps } from 'types/types';
import './Pagination.css';

export default function Pagination(props: Omit<TableProps, 'items'>) {
  // массив с цифрами страниц
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="pagination">
        {pageNumbers.map((number) =>
          number === props.currentPage ? (
            <button
              className="pagination__item active"
              key={number}
              onClick={() => props.paginate(number)}
            >
              {number}
            </button>
          ) : (
            <button
              className="pagination__item"
              key={number}
              onClick={() => props.paginate(number)}
            >
              {number}
            </button>
          )
        )}
      </div>
      <div className="pagination">
        <button className="pagination__btn" onClick={props.prevPage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
        <button className="pagination__btn" onClick={props.nextPage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </button>
      </div>
    </>
  );
}
