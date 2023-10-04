import './App.css';
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// import Loader from './components/Loader/Loader';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Auth from './components/Auth/Auth';
import { useEffect } from 'react';
import store from "./store"
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Account from './components/Account/Account';
import Cart from './components/Cart/Cart';
import Shipping from './components/Order/Shipping';


function App() {
 const {user,isAuthenticated} = useSelector((state) => state.user)

  return (
    <>
     <BrowserRouter>
     <Navbar isAuthenticated={isAuthenticated}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/products/:keyword' element={<Products/>}/>
      <Route path='/login' element={<Auth/>}/>
      {isAuthenticated && 
      <Route path='/account' element={<Account/>}/>
      }
      {isAuthenticated && 
    <Route path='/cart' element={<Cart/>}/>
      }

      <Route path='/login/shipping' element={<Shipping/>}/>
    </Routes>
 
     </BrowserRouter>
    </>
  );
}

export default App;
