import React, { useState, useContext, useEffect, forwardRef, useImperativeHandle } from 'react';
import './paginate.scss';
import { Icon } from 'semantic-ui-react';
import { PAGINATE_BOOKS } from '../../constants/actions';
import { Store } from '../../store'

const Paginate = forwardRef((props, ref) => {
    const {paginateBook} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [isClickedDelete, setIsClickedDelete] = useState(false);
    const linksPerPage = 3;
    const { state, dispatch } = useContext(Store);
    const { addedItems } = state;
    const pageNumbers = [];

    // Logic for displaying current links
    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentBooks = addedItems.slice(indexOfFirstLink, indexOfLastLink);

    for (let i = 1; i <= Math.ceil(addedItems.length / linksPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        console.log('handle click effect');
        handleClickPagination();
    }, [currentPage]);

    useEffect(() => {
        if (isClickedDelete) {
            console.log('paginateBook', paginateBook);

            if (currentPage > 1 && paginateBook.length === 0) {
                setCurrentPage(currentPage => currentPage - 1);
            } else if (paginateBook.length > 0 && paginateBook.length < 3) {
                setCurrentPage(currentPage);
            }
        }
        return (() => {
            setIsClickedDelete(false);
        })
    },[state]);

    useImperativeHandle(ref, () => ({ // this area works from parent when clicked a delete button
        deletedBookFromParent(){       
            setIsClickedDelete(true);
            // handleClickPagination();
        }
    }));
    
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
        console.log('currentbooks', currentBooks);

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
                    <li className="page-direction" onClick={paginateLeft}><Icon name="chevron left" /></li>
                    {renderPageNumbers}
                    <li className="page-direction" onClick={paginateRight}><Icon name="chevron right" /></li>
                </ul>
            }
        </>
    )
});

export default Paginate;