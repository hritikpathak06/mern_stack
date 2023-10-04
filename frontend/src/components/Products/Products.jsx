import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from '../../actions/productAction';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import "./products.css"
import { useParams } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const categories = [
    "Mobile",
    "Laptop",
    "Appliances"
]

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { products, loading } = useSelector((state) => state.products);

    const [price, setPrice] = useState([0, 50000]);
    const[category,setCategory] = useState("");
    const[ratings,setRatings] = useState(0);


    const priceHandler = (event, newPrice) => {
        event.preventDefault();
        setPrice(newPrice);
    }


    useEffect(() => {
        dispatch(getProducts(keyword,price,category,ratings));
    }, [dispatch,keyword,price,category,ratings])


    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <h2 className="productsHeading">
                        All Products
                    </h2>
                    <div className="products">
                        {products && products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={50000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoriesBox">
                          {categories && categories.map((category) => (
                            <li
                            className='category-link'
                            key={category}
                            onClick={() => setCategory(category)}
                            >
                               {category}
                            </li>
                          ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings</Typography>
                            <Slider
                            value={ratings}
                            onChange={(e,newRating) => setRatings(newRating)}
                            aria-labelledby='continuous-slider'
                            valueLabelDisplay='auto'
                            min={0}
                            max={5}
                            />
                        </fieldset>
                    </div>

                </>
            )}
        </>
    )
}

export default Products
