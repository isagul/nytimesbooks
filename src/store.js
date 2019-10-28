import React from 'react';

export const Store = React.createContext();

const initialState = {
    categories: [],
    filteredCategories: [],
    categoryBooks: []
};

function reducer(state, action) {
    let updatedState;

    switch (action.type) {
        case 'SET_DATA':
          // updatedState = [...action.payload];
          return {...state, categories: [...action.payload], filteredCategories: [...action.payload]};
        case 'SET_CATEGORY_DATA':
          // updatedState = [...action.payload];
          console.log(action.payload);
          return {...state, categoryBooks: [...action.payload]};
        case 'FILTER_CATEGORIES':
            updatedState = state.filteredCategories.filter(item => {
                return item.display_name.toLowerCase().includes(action.payload.toLowerCase());
            });
            return {...state, categories: updatedState};
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