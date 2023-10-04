import React from 'react'
import "./account.css"
import {useDispatch,useSelector} from "react-redux"

const Account = () => {
    const {user} = useSelector((state) => state.user);
  return (
  <>
  <div className="conatainer">
     <div className="leftContainer">
        <img src="https://mideastory.com/wp-content/uploads/2022/08/single-boy-dp-49.png" alt="" />
     </div>
     <div className="rightContainer">
        <h1>{user.username}</h1>
        <p>{user.email}</p>
        <p className='role'>{user.role}</p>
        <div className="btnContainer">
            <button>MY ORDERS</button>
             {user.role === "Admin" ? (
                <button>DASHBOARD</button>
             ):null}
        </div>
     </div>
  </div>
  </>
  )
}

export default Account
