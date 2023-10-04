import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productReduer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";


const reducer = combineReducers({
  products:productReduer,
  product:productDetailsReducer,
  user:userReducer,
  cart:cartReducer
});


let initialState={
  cart:{
    cartItem:localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    :[],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  }
};

const middlleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlleware)));

export default store;