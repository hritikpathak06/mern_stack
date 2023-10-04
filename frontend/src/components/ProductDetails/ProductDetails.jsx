import React, { useEffect, useState } from 'react'
import "./productDetails.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Carousel from 'react-material-ui-carousel'
import { getProductDetails } from '../../actions/productAction';
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard';
import Loader from '../Loader/Loader';
import { addToCart } from '../../actions/cartActions';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);

  const[quantity,setQuantity] = useState(5)

  const increaseQty = () => {
    if(product.stock <= quantity){
     return;
    }
    const qty = quantity+1;
    setQuantity(qty);
  }


  const decreaseQty = () => {
     if(quantity <= 1){
      return;
     }
     const qty = quantity-1;
     setQuantity(qty)
  }


  const addToCartHandler = (event) => {
    event.preventDefault();
   
    dispatch(addToCart(id,quantity));
    alert("Item added to cart")
    
  }

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id])

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 45,
    value: product.ratings,
    isHalf: true
  }

  return (
  <>
  {loading ? <Loader/> : (
     <>
     <div className="productDetails">
       <div>

         <Carousel
           indicators={true}
           interval={2000}
         >
           {product.images && product.images.map((item, i) => (
             <img src={item.url} alt={i} className='carouselImage' key={item.url} />
           ))}
         </Carousel>
       </div>

       <div>
         <div className="detailBlock-1">
           <h2>{product.name}</h2>
           <p>Product# {product._id}</p>
         </div>

         <div className="detailsBlock-2">
           <ReactStars {...options} />
           <span>({product.numOfReviews})</span>
         </div>

         <div className="detailsBlock-3">
           <h1>₹{product.price}</h1>
           <div className="detailsBlock-3-1">
             <div className="detailsBlock-3-1-1">
               <button onClick={decreaseQty}>-</button>
               <input type="number" value={quantity} readOnly />
               <button onClick={increaseQty}>+</button>
             </div>
             <button onClick={addToCartHandler}>Add To Cart</button>
           </div>
           <p>Status:
             <b className={product.stock < 1 ? "redColor" : "greenColor"}>
               {product.stock < 1 ? "Out Of Stock" : "In Stock"}
             </b>
           </p>
         </div>
         <div className="detailsBlock-4">
           Description: <p>{product.description}</p>
         </div>
         <button>Submit Review</button>
       </div>
     </div>

     {product.reviews && product.reviews[0]? (
       <>
     <h3 className="reviewHeading">
       Reviews
     </h3>

       <div className="productReviews">
           {product.reviews && product.reviews.map((review) => (
             <ReviewCard review={review}/>
           ))}
       </div>
       </>
     ):null}
   </>
  )}
  </>
  )
}

export default ProductDetails
