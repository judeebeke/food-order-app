import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  httpError: '',
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () =>{},
  setHttpError: ()=>{},
});

export default CartContext;