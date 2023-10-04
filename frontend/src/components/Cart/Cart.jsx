import React, { useEffect } from 'react'
import "./cart.css"
import { useDispatch, useSelector } from "react-redux"
import CartItemsCard from './CartItemsCard';
import { addToCart,removeFromCarts } from '../../actions/cartActions';
import { useNavigate, useParams } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const { cartItem } = useSelector((state) => state.cart)

    const decreaseQuantity = (id,quantity) => {
        const newQty = quantity-1;
        if(1>=quantity){
         return;
        }
        dispatch(addToCart(id,newQty));
    }

    const increaseQuantity = (id,quantity,stock) => {
       const newQty = quantity+1;
       if(stock <= quantity){
        return;
       }
       dispatch(addToCart(id,newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeFromCarts(id))
    }

    // const item = {
    //     product: "productId",
    //     price: 5000,
    //     name: "ritik babu",
    //     image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    //     quantity: 2
    // }

    const checkOuthandler = () => {
        navigate("/login?redirect=shipping")
    }
  


    return (
      <>

     {cartItem.length === 0 ? "No Item" :(
        <>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>

                {cartItem && cartItem.map((item, index) => (
                    <>
                    <div className="cartContainer">
                        <CartItemsCard item={item} key={index} deleteCartItems={deleteCartItems}  />
                        <div className="cartInput">
                            <button onClick={() => decreaseQuantity(item.product,item.quantity)}>-</button>
                            <input type="number" readOnly value={item.quantity} />
                            <button onClick={() => increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                        </div>
                        <p className="cartSubtotal">
                            {`₹: ${item.price * item.quantity}`}
                        </p>
                    </div>

                    </>

                ))}


                <div className="cartTotal">
                    <div></div>
                    <div className="cartProfit">
                        <p>Total</p>
                        <p>{`₹:${cartItem.reduce(
                            (acc,item) => acc+item.quantity*item.price,0
                        )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkOuthandler}>Check Out</button>
                    </div>
                </div>
            </div>
        </>
     )}

      </>
    )
}

export default Cart
