import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from '../../store';
import { Spin, Button } from 'antd';
import { CloseCircleFilled, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { REMOVE_FAVOURITE, GET_FAVOURITES } from '../../constants/actions';
import App from '../App';
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