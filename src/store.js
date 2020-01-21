import React from 'react';
import {
  SET_DATA,
  SET_CATEGORY_DATA,
  ADD_TO_CARD,
  DECREASE_ITEM_COUNT,
  DELETE_BOOK,
  GET_SHOPPING_ITEMS,
  INCREASE_ITEM_COUNT,
  LOGGED_USER,
  PAGINATE_BOOKS,
  SET_USERS,
  FILTER_CATEGORIES
} from './constants/actions';

export const Store = React.createContext();

const initialState = {
  categories: [],
  filteredCategories: [],
  categoryBooks: [],
  addedItems: [],
  paginateBooks: [],
  users: [],
  loggedUser: {}
};

function reducer(state, action) {
  let updatedState;
  let index;

  switch (action.type) {
    case SET_DATA:
      return { ...state, categories: [...action.payload], filteredCategories: [...action.payload] };
    case SET_CATEGORY_DATA:
      return { ...state, categoryBooks: [...action.payload] };
    case FILTER_CATEGORIES:
      updatedState = state.filteredCategories.filter(item => {
        return item.display_name.toLowerCase().includes(action.payload.toLowerCase());
      });
      return { ...state, categories: updatedState };
    case ADD_TO_CARD:
      index = state.addedItems.findIndex(el => el.primary_isbn10 == action.payload.primary_isbn10);
      if (index === -1) {
        let price = Number((Math.random() * (30 - 10) + 10).toFixed(2));
        let orderCount = 1;
        action.payload["book_price"] = price;
        action.payload["total_book_price"] = price;
        action.payload["order_count"] = orderCount;
        return { ...state, addedItems: [...state.addedItems, action.payload] }
      }
    case GET_SHOPPING_ITEMS:
      return { ...state, addedItems: [...action.payload] }
    case PAGINATE_BOOKS: {
      return { ...state, paginateBooks: [...action.payload] }
    }
    case INCREASE_ITEM_COUNT:
      updatedState = state.addedItems.map(item => {
        if (item.primary_isbn10 === action.payload.primary_isbn10) {
          item.order_count++;
          item.total_book_price = item.book_price * item.order_count;
        }
        return item;
      });
      return { ...state, addedItems: updatedState };
    case DECREASE_ITEM_COUNT:
      updatedState = state.addedItems.map(item => {
        if (item.primary_isbn10 === action.payload.primary_isbn10) {
          if (item.order_count > 1) {
            item.order_count--;
            item.total_book_price = item.book_price * item.order_count;
          }
        }
        return item;
      });
      return { ...state, addedItems: updatedState };
    case DELETE_BOOK:
      updatedState = [...state.addedItems];
      index = updatedState.findIndex(el => el.primary_isbn10 == action.payload.primary_isbn10);
      updatedState.splice(index, 1);

      let updatedPaginateBooks = [...state.paginateBooks];
      let indexPaginate = updatedPaginateBooks.findIndex(el => el.primary_isbn10 == action.payload.primary_isbn10);
      updatedPaginateBooks.splice(indexPaginate, 1);

      return { ...state, addedItems: updatedState, paginateBooks: updatedPaginateBooks }
    case SET_USERS:
      updatedState = [...state.users];
      updatedState.push(action.payload);
      return { ...state, users: updatedState }
    case LOGGED_USER:
      updatedState = { ...action.payload };
      return { ...state, loggedUser: updatedState }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    state,
    dispatch
  }

  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  )
}
