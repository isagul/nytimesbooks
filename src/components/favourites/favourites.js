import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from '../../store';
import { Spin, Button } from 'antd';
import { CloseCircleFilled, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { REMOVE_FAVOURITE, GET_FAVOURITES, ADD_TO_CARD } from '../../constants/actions';
import App from '../App';
import { NotificationManager } from 'react-notifications';
import { HOME } from '../../constants/routes';
import './favourites.scss';


const Favourites = () => {
    const { state, dispatch } = useContext(Store);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('email')) {
            axios.post('https://api-appnytimes.herokuapp.com/book/get-favourites', {
                "email": localStorage.getItem('email')
            }).then(response => {
                if (response.data.status) {
                    dispatch({
                        type: GET_FAVOURITES,
                        payload: response.data.favourites
                    })
                }
            }).catch(error => {

            })
            setIsActive(false);
        }
    }, [])

    function deleteBookFromFavourites(value) {
        setIsActive(true);
        value.is_favourite = false;

        dispatch({
            type: REMOVE_FAVOURITE,
            payload: value
        });

        if (localStorage.getItem('email')) {
            axios.delete('https://api-appnytimes.herokuapp.com/book/favourites/delete', {
                data: {
                    email: localStorage.getItem('email'),
                    primary_isbn10: value.primary_isbn10
                }
            })
                .then(response => {
                    // console.log(response);
                })
                .catch(error => {
                    // console.log(error);
                })
        }

        setTimeout(() => {
            setIsActive(false);
        }, 500);
    }

    function addToCart(value) {
        setIsActive(true);
        const index = state.addedItems.findIndex(el => el.primary_isbn10 == value.primary_isbn10);
        if (index === -1) {
            let price = Number((Math.random() * (30 - 10) + 10).toFixed(2));
            let orderCount = 1;
            value["book_price"] = price;
            value["total_book_price"] = price;
            value["order_count"] = orderCount;

            dispatch({
                type: ADD_TO_CARD,
                payload: value
            });

            if (localStorage.getItem('email')) {
                axios.post('https://api-appnytimes.herokuapp.com/book/add-to-cart', {
                    "email": localStorage.getItem('email'),
                    "primary_isbn10": value.primary_isbn10,
                    "primary_isbn13": value.primary_isbn13,
                    "publisher": value.publisher,
                    "description": value.description,
                    "title": value.title,
                    "author": value.author,
                    "contributor": value.contributor,
                    "book_image": value.book_image,
                    "buy_links": value.buy_links,
                    "book_price": value.book_price,
                    "total_book_price": value.total_book_price,
                    "order_count": value.order_count
                })
                    .then(response => {
                        NotificationManager.success(`Book was added successfully`, 'Success');
                        // console.log(response);
                    })
                    .catch(error => {
                        NotificationManager.error('Something went wrong!', 'Error');
                    })
            }
            setTimeout(() => {
                setIsActive(false);
            }, 500);
        } else {
            NotificationManager.warning('This book already exists in your cart', 'Warning');
            setIsActive(false);
        }
    }

    return (
        <App>
            <div className="favourites-component">
                <Spin spinning={isActive} size="large" style={{ height: '100vh', maxHeight: 'none' }}>
                    <h3 className="page-title">My Favourites</h3>
                    {
                        state.favourites.length > 0 ?
                            <div className="favourites-area">
                                {
                                    state.favourites.map((favourite, index) => {
                                        return (
                                            <div key={index} className="favourite-book">
                                                <img className="book-image" src={`${favourite.book_image}`} />
                                                <CloseCircleFilled className="delete-icon" onClick={() => deleteBookFromFavourites(favourite)} />
                                                <span className="title">{favourite.title}</span>
                                                <span className="author">{favourite.contributor}</span>
                                                <button className="add-to-cart" onClick={() => addToCart(favourite)}>Add To Cart</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="empty-favourites">
                                <HeartOutlined className="heart-icon" />
                                <span className="info">Your favorites list is empty</span>
                                <Link to={HOME}>
                                    <Button className="btn-view-books">View Books</Button>
                                </Link>
                            </div>
                    }
                </Spin>
            </div>
        </App>
    )
}

export default Favourites;