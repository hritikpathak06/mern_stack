import React, { useEffect } from 'react'
import "./home.css"
import Product from '../Product/Product'
import {useDispatch,useSelector} from "react-redux"
import { clearErrors, getProducts } from '../../actions/productAction'
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'
// const product = {
//     name:'blue shirt',
//     price:"Rs. 3000",
//     images:[{url:"https://m.media-amazon.com/images/I/51vFHmOCMmL._SY550_.jpg"}],
//     _id:"ritik"
// }

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state) => state.products);


  useEffect(() => {
    if(error){
      return alert("Sorry we cant fetch the data.please try after sometime");
    }
    dispatch(clearErrors());
    dispatch(getProducts());
  },[dispatch,error])

  return (
   <>
   {loading ? (<Loader/>) :(
     <>
     <div className="banner">
         <p>Welcome to e-ccomerce</p>
         <h1>Find Amazing Products Here</h1>
 
         <a href="#container">
             <button>Scroll </button>
         </a>
     </div>
 
     <h2 className="homeHeading">Products</h2>
     
     <div className="container" id="container">
       {products && products.map((product,key) => (
         <Product product={product}/>
       ))}
     </div>
     </>
   )}
   </>
  )
}

export default Home
