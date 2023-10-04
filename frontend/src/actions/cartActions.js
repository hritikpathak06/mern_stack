import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";


// Add To Cart
export const addToCart = (id,quantity) => async(dispatch,getState) => {
    const {data} = await axios.get(`http://localhost:5000/api/v1/product/${id}`);

    dispatch({type:ADD_TO_CART,
    payload:{
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0],
        stock:data.product.stock,
        quantity
    }
    })

    localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItem));
}

// Remove From Cart
export const removeFromCarts = (id) => async(dispatch,getState) => {
    dispatch({type:REMOVE_FROM_CART,
    payload:id
    })
    localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItem));
}

export const saveShippingInfo = (data) => async(dispatch) => {
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })

    localStorage.setItem("shippingInfo",JSON.stringify(data));
}