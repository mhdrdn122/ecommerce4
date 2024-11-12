import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export function PaginatedItems({  setPage , limit , total }) {
  const pageCount = total / limit
  
  return (
    <>
<ReactPaginate
  containerClassName={"pagination d-flex align-items-center pt-3  w-50 justify-content-between text-center"}
  pageClassName={"page-item "}
  activeClassName={"active white"}
  onPageChange={ (e) => setPage(e.selected + 1) }
  pageCount={pageCount}
  breakLabel="..."
  renderOnZeroPageCount={null}
  previousLabel={ <FontAwesomeIcon size='36px' color='#B8C1CC' icon={faArrowLeft}/>}
  nextLabel={<FontAwesomeIcon size='36px' color='#B8C1CC' icon={faArrowRight}/>}
  pageRangeDisplayed={1}
/>
    </>
  );
}

