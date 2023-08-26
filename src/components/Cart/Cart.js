import { Fragment, useContext, useState } from "react";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import useHttp from "../custom-hooks/useHttp";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitOrderError, setIsSubmitOrderError] = useState(false);

  const {isSubmitOrder, isSubmitting, httpRequest: fetchMeals} = useHttp(setIsSubmitOrderError)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkOutHandler = () => {
    setIsCheckout((prev) => {
      return !prev;
    });
  };

  let cartActions = (<>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={checkOutHandler}>
            Order
          </button>
          
        )}
      </div>
      </>
  );

  const orderRevertButton = <div className={`${classes['actions-revert']} ${classes.actions}`}>
  <button className={classes.button} onClick={checkOutHandler}>
       Back
     </button>
 </div>

  const submitOrderHandler = async (userData) => {
    let orderItems = cartCtx.items
   
    fetchMeals("https://resturant-list-f5d9d-default-rtdb.firebaseio.com/order.json", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: {userData, orderItems}
      })

  }

  const modalContent  = <Fragment>
    {isCheckout && orderRevertButton}
      {!isCheckout && cartItems}
      <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      {isCheckout && totalAmount !== "$0.00" && <Checkout onCancel={props.onClose} orderHandler={submitOrderHandler} />}
      {!isCheckout && cartActions}
  </Fragment>

  const clearCartHandler = ()=> {
    props.onClose()
    cartCtx.clearItems()
  }

  const completedOrderInfo = <Fragment>
    <h3>Order Completed!</h3>
    <div className={classes.actions}>
    <button className={classes.button} onClick={clearCartHandler}>
       Close
     </button>
 </div>
  </Fragment>

const failedOrder = <Fragment>
<h3 className={classes.mealError}>Failed to process Order</h3>
<div className={classes.actions}>
<button className={classes.button} onClick={clearCartHandler}>
   Close
 </button>
</div>
</Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitOrder && !isSubmitOrderError && modalContent}
      {isSubmitting && !isSubmitOrder && <h3><em>Processing Order...</em></h3>}
      {isSubmitOrder && completedOrderInfo}
      {!isSubmitOrder && isSubmitOrderError && !isSubmitting && failedOrder}
    </Modal>
  );
};

export default Cart;
