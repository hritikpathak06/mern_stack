import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productContsnats";
import axios from "axios";



export const getProducts = (keyword="",price=[0,50000],category,ratings=0) => async(dispatch) => {
    try {
        dispatch({type:ALL_PRODUCT_REQUEST})

        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `http://localhost:5000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const {data} = await axios.get(link);

        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data})

    } catch (error) {
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message})
    }
}

// productDetails
export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`http://localhost:5000/api/v1/product/${id}`);

        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data.product})

    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.response.data.message});
    }
}


export const clearErrors = () => async(dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}
