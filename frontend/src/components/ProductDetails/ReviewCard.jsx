import React from 'react'
import ReactStars from "react-rating-stars-component"
import "../ProductDetails/productDetails.css"

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
      }
    
  return (
  <>
  <div className="reviewCard">
    <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" alt="" />
    <p>{review.name}</p>
  <ReactStars {...options}/>
  <span>{review.comment}</span>
  </div>
  </>
  )
}

export default ReviewCard
