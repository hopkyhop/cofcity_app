import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
    const itemsPerPage = 4; //число элементов на странице
    const countItems = 10; //общее число элементов data.count
    const pageCount = Math.ceil(countItems / itemsPerPage); 
    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                forcePage={currentPage - 1}
                previousLabel="<"
                onPageChange={(event) => onChangePage(event.selected + 1)}
            />
        </>
    )
}
