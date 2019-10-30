import React from 'react';

export const Store = React.createContext();

const initialState = {
    categories: [],
    filteredCategories: [],
    categoryBooks: [],
    addedItems: []
};

function reducer(state, action) {
    let updatedState;
    let index;

    switch (action.type) {
        case 'SET_DATA':
          return {...state, categories: [...action.payload], filteredCategories: [...action.payload]};
        case 'SET_CATEGORY_DATA':
          return {...state, categoryBooks: [...action.payload]};
        case 'FILTER_CATEGORIES':
            updatedState = state.filteredCategories.filter(item => {
                return item.display_name.toLowerCase().includes(action.payload.toLowerCase());
            });
            return {...state, categories: updatedState};
        case 'ADD_TO_CARD':
          index = state.addedItems.findIndex(el => el.primary_isbn10 == action.payload.primary_isbn10);
          if(index === -1) {
            return { ...state, addedItems: [...state.addedItems, action.payload]}
          }
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
