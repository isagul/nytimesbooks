import React, {useState, useContext, useEffect} from 'react';
import './paginate.scss';
import {Icon} from 'semantic-ui-react';
import {PAGINATE_BOOKS} from '../../constants/actions';
import {Store} from '../../store'

const Paginate = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const linksPerPage = 3;
    const {state, dispatch} = useContext(Store);
    const {addedItems} = state;

    useEffect(() => {
        handleClickPagination();
    }, [currentPage]);

    // useEffect(() => {
    //     console.log(currentPage);
    //     console.log(state.paginateBooks);
    //     if(state.paginateBooks.length === 0) {
    //         setCurrentPage(prevState => prevState - 1);
    //     }
    // },  [currentPage]);

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

    // Logic for displaying current links
    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentBooks = addedItems.slice(indexOfFirstLink, indexOfLastLink);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(addedItems.length / linksPerPage); i++) {
        pageNumbers.push(i);
    }

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
            >
                {number}
            </li>
        );
    });

    return (
        <>
            {
                addedItems.length > 3 &&
                <ul className="page-numbers">
                    <li className="page-direction" onClick={paginateLeft}><Icon name="chevron left"/></li>
                    {renderPageNumbers}
                    <li className="page-direction" onClick={paginateRight}><Icon name="chevron right"/></li>
                </ul>
            }
        </>
    )
}

export default Paginate;