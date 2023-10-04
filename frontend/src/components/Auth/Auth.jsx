import React, { useEffect, useRef, useState } from 'react'
import "./auth.css"
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import { NavLink, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from '../../actions/userAction';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {  isAuthenticated } = useSelector((state) => state.user)


    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const { username, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png")

    const loginSubmit = (event) => {
        event.preventDefault();
        // alert("Form submitted")
        dispatch(loginUser(loginEmail, loginPassword));
        // alert("User logged in");
        // navigate("/account")
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set('username', username);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        dispatch(registerUser(myForm));
    }

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }

    }

    const switchTab = (e, tab) => {
        e.preventDefault();
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    const redirect  = location.search ? location.search.split("=")[1] :"/account"

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
        if(!isAuthenticated){
            navigate("/login")
        }
    },[dispatch,isAuthenticated,navigate,redirect])



    return (
        <>
            <div className="authContainer">
                <div className="authBox">
                    <div>
                        <div className="auth_toggle">
                            <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
                            <p onClick={((e) => switchTab(e, "register"))}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form ref={loginTab} className="loginForm" onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <EmailIcon />
                            <input type="email"
                                placeholder='Enter your email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <KeyIcon />
                            <input type="password"
                                placeholder='Enter Your Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <NavLink to={"/register"}>Dont have an account ?</NavLink>
                        <input type="submit" value={"Login"} className='loginBtn' />
                    </form>

                    <form action="" className='signUpForm' ref={registerTab}
                        encType='multipart/form-data'
                        onClick={registerSubmit}
                    >
                        <div className="signUpName">
                            <Person2RoundedIcon />
                            <input type="text"
                                placeholder='enter your name'
                                required
                                name='username'
                                value={username}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <EmailIcon />
                            <input type="email"
                                placeholder='enter your email'
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <KeyIcon />
                            <input type="password"
                                placeholder='enter your password'
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value={"Register"} className='signUpBtn' />

                    </form>
                </div>
            </div>
        </>
    )
}

export default Auth
