import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import { FiLogIn } from "react-icons/fi"

const Navbar = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(" ");

    const searchHandler = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate("/products")
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">SHOPY</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/"} className="nav-link" active>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/about"} className="nav-link" active>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/products"} className="nav-link" active>Products</NavLink>
                            </li>
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <NavLink to={"/cart"} className="nav-link" active>
                                        <FiShoppingCart />
                                    </NavLink>
                                </li>
                            ) : null}

                            <li className="nav-item">
                                <NavLink to={isAuthenticated === "true" ? "/account" : "/login"} className="nav-link" active>
                                    {isAuthenticated ? <FaUser /> : <FiLogIn />}
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={searchHandler}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search Products"
                                aria-label="Search"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
