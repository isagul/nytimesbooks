import React, { useState, useContext, useEffect, forwardRef, useImperativeHandle } from 'react';
import './paginate.scss';
import { Icon } from 'semantic-ui-react';
import { PAGINATE_BOOKS } from '../../constants/actions';
import { Store } from '../../store'

const Paginate = forwardRef((props, ref) => {
    const { paginateBook } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [isClickedDelete, setIsClickedDelete] = useState(false);
    const linksPerPage = 3;
    const { state, dispatch } = useContext(Store);
    const { addedItems } = state;
    const pageNumbers = [];

    const currentBooks = getCurrentBooks();

    for (let i = 1; i <= Math.ceil(addedItems.length / linksPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        handleClickPagination();
    }, [currentPage]);

    useEffect(() => {
        if (isClickedDelete) {
            if (currentPage > 1 && paginateBook.length === 0) {
                setCurrentPage(currentPage => currentPage - 1);
            } else if (paginateBook.length > 0 && paginateBook.length < 3) {
                const currentBooks = getCurrentBooks();
                dispatch({
                    type: PAGINATE_BOOKS,
                    payload: currentBooks
                })
            }
        }
        return (() => {
            setIsClickedDelete(false);
        })
    }, [isClickedDelete]);

    useImperativeHandle(ref, () => ({ // this area works from parent when clicked a delete button
        deletedBookFromParent() {
            setIsClickedDelete(true);
        }
    }));

    function getCurrentBooks() {
        // Logic for displaying current links
        const indexOfLastLink = currentPage * linksPerPage;
        const indexOfFirstLink = indexOfLastLink - linksPerPage;
        return addedItems.slice(indexOfFirstLink, indexOfLastLink);
    }

    const paginateLeft = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage => currentPage - 1);
        }
    };

    const paginateRight = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage => currentPage + 1);
        }
    };

    const handleClickPagination = (event = null) => {
        if (event !== null) {
            setCurrentPage(Number(event.target.id));
        }
        dispatch({
            type: PAGINATE_BOOKS,
            payload: currentBooks
        })
    };

    const renderPageNumbers = pageNumbers.map((number, index) => {
        return (
            <li
                key={number}
                id={number}
                className={`page-numbers-item ${index + 1 === currentPage && 'current-page-style'}`}
                onClick={handleClickPagination}
            > {number} </li>
        );
    });

    return (
        <>
            {
                addedItems.length > 3 &&
                <ul className="page-numbers">
                    <li className={`page-direction ${currentPage === 1 && 'disable-paginate-button'} `} onClick={paginateLeft}><Icon name="chevron left" /></li>
                    {renderPageNumbers}
                    <li className={`page-direction ${currentPage === pageNumbers.length && 'disable-paginate-button'} `} onClick={paginateRight}><Icon name="chevron right" /></li>
                </ul>
            }
        </>
    )
});

export default Paginate;