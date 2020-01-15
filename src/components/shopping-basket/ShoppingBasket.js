import React, { useContext, useState } from 'react';
import { Store } from '../../store';
import Header from '../header/Header';
import TotalBasket from '../total-basket/TotalBasket';
import FooterComponent from '../footer/Footer';
import { Select, Button, Modal } from 'semantic-ui-react';
import './ShoppingBasket.scss';

const ShoppingBasket = () => {
  const { state, dispatch } = useContext(Store);
  const [openModal, setOpenModal] = useState(false);
  const [deletedBook, setDeletedBook] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(1);

  const show = function (value) {
    setOpenModal(true);
    setDeletedBook(value);
  }

  const close = () => {
    setOpenModal(false);
  }

  const increaseItemCount = function (value) {
    dispatch({
      type: 'INCREASE_ITEM_COUNT',
      payload: value
    })
  }

  const decreaseItemCount = function (value) {
    dispatch({
      type: 'DECREASE_ITEM_COUNT',
      payload: value
    })
  }

  const deleteItem = function (value) {
    close();
    dispatch({
      type: 'DELETE_BOOK',
      payload: value
    })
  }

  const items = state.addedItems.map((value, index) => {
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
            <Button inverted color='red' onClick={() => show(value)} className="delete-button">
              Delete
            </Button>
          </div>
        </div>
        <Modal size="mini" open={openModal} onClose={close} className="delete-modal">
          <Modal.Header>Delete Book</Modal.Header>
          <Modal.Content>
            <p className="modal-content"><span>{deletedBook.title}</span> will be deleted.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              onClick={() => deleteItem(deletedBook)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  });

  return (
    <div className="shopping-basket-component">
      <Header />
      {
        state.addedItems.length > 0 ?
          <div className="shopping-basket">
            <div className="items-div">
              {items}
            </div>
            <TotalBasket />
          </div> :
          <p className="empty-cart">Your shopping cart is empty.</p>
      }
      <FooterComponent />
    </div>
  )
}

export default ShoppingBasket;
