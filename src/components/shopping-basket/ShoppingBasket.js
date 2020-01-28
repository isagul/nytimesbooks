import React, { useContext, useState, useEffect, useRef } from 'react';
import { Store } from '../../store';
import firebase from '../../firebase.config';
import Header from '../header/Header';
import TotalBasket from '../total-basket/TotalBasket';
import FooterComponent from '../footer/Footer';
import { Button, Modal } from 'semantic-ui-react';
import ScrollUpButton from '../shared/scrollUpButton';
import Paginate from '../../services/pagination/paginate';
import { GET_SHOPPING_ITEMS, INCREASE_ITEM_COUNT, DECREASE_ITEM_COUNT, DELETE_BOOK } from '../../constants/actions';
import './ShoppingBasket.scss';

const ShoppingBasket = () => {
  const { state, dispatch } = useContext(Store);
  const [openModal, setOpenModal] = useState(false);
  const [deletedBook, setDeletedBook] = useState({});

  const paginationComp = useRef();

  const db = firebase.firestore();
  const auth = firebase.auth();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              if (doc.data().basket) {
                dispatch({
                  type: GET_SHOPPING_ITEMS,
                  payload: doc.data().basket
                })
              }
            });
          })
      }
    })
  }, [])

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

    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              db.collection("nytimes").doc(doc.id).update({ basket: state.addedItems });
            });
          })
      }
    })
    
    paginationComp.current.updatePaginateBooks();
  }

  function decreaseItemCount(value) {
    dispatch({
      type: DECREASE_ITEM_COUNT,
      payload: value
    })

    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              db.collection("nytimes").doc(doc.id).update({ basket: state.addedItems });
            });
          })
      }
    })

    paginationComp.current.updatePaginateBooks();
  }

  function deleteItem(value) {
    close();
    dispatch({
      type: DELETE_BOOK,
      payload: value
    });
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("nytimes").where("uid", "==", user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              const basket = doc.data().basket;
              const index = basket.findIndex(el => el.primary_isbn10 == value.primary_isbn10);
              basket.splice(index, 1);
              db.collection("nytimes").doc(doc.id).update({ basket });
            });
          })
      }
    })
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
              <Paginate ref={paginationComp} paginateBook={state.paginateBooks}/>
            </div>
            <TotalBasket />
          </div> :
          <p className="empty-cart">Your shopping cart is empty.</p>
      }
      <FooterComponent />
      <ScrollUpButton />
    </div>
  )
}

export default ShoppingBasket;
