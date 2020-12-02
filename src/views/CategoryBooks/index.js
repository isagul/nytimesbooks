import React, { useEffect, useState } from 'react';
import { Store } from '../../store';
import axios from 'axios';
import { Spin, Button } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import App from '../../components/App';
import { NotificationManager } from 'react-notifications';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  SET_CATEGORY_DATA,
  ADD_TO_CARD,
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
  GET_FAVOURITES
} from '../../constants/actions';
import './style.scss';

const CategoryBooks = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('email')) {
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
      // console.log(error);
    })
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    let categoryRoute = props.location.state.category.list_name_encoded;
    axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${categoryRoute}.json`, {
      params: {
        'api-key': process.env.API_KEY
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          setIsActive(false);
          dispatch({
            type: SET_CATEGORY_DATA,
            payload: response.data.results.books
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  function addToCard(value) {
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

  function addToFavourite(value) {
    setIsActive(true);

    dispatch({
      type: ADD_TO_FAVOURITE,
      payload: value
    });

    if (localStorage.getItem('email')) {
      axios.post('https://api-appnytimes.herokuapp.com/book/favourites/add', {
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
        "order_count": value.order_count,
        "is_favourite": true
      })
        .then(response => {
          setIsActive(false);
        })
        .catch(error => {
          setIsActive(false);
        })
    }
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  }

  function removeFavourite(value) {
    setIsActive(true);

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
          setIsActive(false);
        })
        .catch(error => {
          // console.log(error);
          setIsActive(false);
        })
    }
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  }

  const createHeartIcon = value => {
    const book = state.favourites.find(favourite => favourite.title === value.title);
    if (book) {
      return (
        <HeartFilled onClick={() => removeFavourite(value)} className="remove-favourite" />
      )
    } else {
      return <HeartOutlined onClick={() => addToFavourite(value)} className="add-to-favourite" />
    }
  }

  const categoryDetail = state.categoryBooks.length > 0 &&
    state.categoryBooks.map((value, index) => {
      return (
        <div className="all-detail" key={index}>
          <LazyLoadImage 
            className="book-image" 
            src={`${value.book_image}`} 
            effect="blur"
            />
          <div className="details">
            <div className="name-author">
              <h3>{value.title}</h3>
              <p><span>by </span>{value.author}</p>
            </div>
            <p className="desc">{value.description}</p>
            <div className="actions-area">
              {
                state.favourites.length > 0 ? createHeartIcon(value)
                  : <HeartOutlined onClick={() => addToFavourite(value)} className="add-to-favourite" />
              }
              <Button onClick={() => addToCard(value)} className="add-to-card">
                <ShoppingCartOutlined /> Add To Cart
              </Button>
            </div>
          </div>
        </div>
      )
    })

  return (
    <App>
      <div className="category-books">
        <Spin spinning={isActive} size="large" style={{ height: '100vh', maxHeight: 'none' }}>
          <div className="category-detail-container">
            <h2 className="title">{props.location.state.category.display_name}</h2>
            {categoryDetail}
          </div>
        </Spin>
      </div>
    </App>
  )
}

export default CategoryBooks;
