import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL
    } from "../constants/userConstants";

import axios from "axios";

// LoGIN User
export const loginUser = (email,password) => async(dispatch) => {
    try {
        dispatch({type:LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(
            `http://localhost:5000/api/v1/login`,
            {email, password},
            config
        )
        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    } catch (error) {
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
    }
}


// REGISTER USER
export const registerUser = (userData) => async(dispatch) => {
    try {
        dispatch({type:REGISTER_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}

        const {data} = await axios.post(
            `http://localhost:5000/api/v1/register`,
            userData,
            config
        )
        dispatch({type:REGISTER_SUCCESS,payload:data.user});
    } catch (error) {
        dispatch({type:REGISTER_FAIL,payload:error.response.data.message})
    }
}

// load user

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST})
         
        const link = "http://localhost:5000/api/v1/me"

        const {data} = await axios.get(link)
        dispatch({type:LOAD_USER_SUCCESS, payload:data.user})
    } catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload:error.response.data.message})
    }
}
