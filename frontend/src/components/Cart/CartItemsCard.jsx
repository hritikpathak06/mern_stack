import React from 'react'
import "../Cart/cart.css"
import { NavLink } from 'react-router-dom'

const CartItemsCard = ({item,deleteCartItems}) => {
  return (
<>
<div className="cartItemsCard">
    <img src={item.image.url} alt="" />
    <div>
        <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
        <span>{`Price:₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>REMOVE</p>
    </div>
</div>
</>
  )
}

export default CartItemsCard
