import React, { useContext, useState, useRef } from 'react';
import { Store } from '../../store';
import TotalBasket from '../total-basket/TotalBasket';
import { Button, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Paginate from '../../services/pagination/paginate';
import App from '../App';
import { INCREASE_ITEM_COUNT, DECREASE_ITEM_COUNT, DELETE_BOOK } from '../../constants/actions';
import { HOME } from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './ShoppingBasket.scss';

const ShoppingBasket = () => {
  const { state, dispatch } = useContext(Store);
  const [openModal, setOpenModal] = useState(false);
  const [deletedBook, setDeletedBook] = useState({});
  const history = useHistory();

  const paginationComp = useRef();

  const show = function (value) {
    setOpenModal(true);
    setDeletedBook(value);
  }

  const close = () => {
    setOpenModal(false);
  }

  function increaseItemCount(value) {
    dispatch({
      type: INCREASE_ITEM_COUNT,
      payload: value
    });

    if (localStorage.getItem('email')) {
      axios.post('https://api-appnytimes.herokuapp.com/user/update-basket', {
        email: localStorage.getItem('email'),
        basket: state.addedItems
      })
        .then(response => {
        })
        .catch(error => {
          console.log(error);
        })
    }

    paginationComp.current.updatePaginateBooks();
  }

  function decreaseItemCount(value) {
    dispatch({
      type: DECREASE_ITEM_COUNT,
      payload: value
    })

    if (localStorage.getItem('email')) {
      axios.post('https://api-appnytimes.herokuapp.com/user/update-basket', {
        email: localStorage.getItem('email'),
        basket: state.addedItems
      })
        .then(response => {
        })
        .catch(error => {
          console.log(error);
        })
    }

    paginationComp.current.updatePaginateBooks();
  }

  function deleteItem(value) {
    close();
    dispatch({
      type: DELETE_BOOK,
      payload: value
    });

    if (localStorage.getItem('email')) {
      axios.delete('https://api-appnytimes.herokuapp.com/book/delete', {
        data: {
          email: localStorage.getItem('email'),
          primary_isbn10: value.primary_isbn10
        }
      })
        .then(response => {
          // console.log('delete book', response)
        })
        .catch(error => {
          console.log(error);
        })
    }

    paginationComp.current.deletedBookFromParent();
  }

  const items = state.paginateBooks.map((value, index) => {
    return (
      <div className="added-items" key={index}>
        <div className="heading">
          <p className="title">{value.title}</p>
          <p className="author">{value.contributor}</p>
        </div>
        <div className="content">
          <div className="added-items-left-side">
            <img className="book-image" src={`${value.book_image}`} />
          </div>
          <div className="added-items-center">
            <p>Buy Online</p>
            <ul>
              {value.buy_links.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.url} target="_blank">{link.name}</a>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* <Button inverted color='red' onClick={() => show(value)} className="delete-button" style={{ alignSelf: 'flex-start' }}>
            Delete
          </Button> */}
          <div className="added-items-right-side">
            <div className="item-count-change">
              <Button onClick={() => increaseItemCount(value)}>
                +
              </Button>
              <Button onClick={() => decreaseItemCount(value)}>
                -
              </Button>
            </div>
            <div className="count-price">
              <p className="item-count">Item Count: <span>{value.order_count}</span></p>
              <p className="price">Total Price: <span>${Number(value.total_book_price.toFixed(2))}</span></p>
            </div>
            <Button danger onClick={() => show(value)} className="delete-button">
              Delete
            </Button>
          </div>
        </div>
        <Modal
          title="Delete Book"
          className="delete-modal"
          visible={openModal}
          onOk={() => deleteItem(deletedBook)}
          onCancel={close}
          okButtonProps={{ type: 'danger' }}
          centered
        >
          <p className="modal-content"><span>{deletedBook.title}</span> will be deleted.</p>
        </Modal>
      </div>
    )
  });

  return (
    <App>
      <div className="shopping-basket-component">
        <h3 className="page-title">My Cart</h3>
        {
          state.addedItems.length > 0 ?
            <div className="shopping-basket">
              <div className="items-div">
                {items}
                <Paginate ref={paginationComp} paginateBook={state.paginateBooks} />
              </div>
              <TotalBasket />
            </div> :
            <div className="empty-basket">
              <ShoppingCartOutlined className="shopping-icon" />
              <span className="info">Your shopping cart is empty</span>
              <Button onClick={() => history.push(HOME)} className="btn-view-books">View Books</Button>
            </div>
        }
      </div>
    </App>
  )
}

export default ShoppingBasket;
