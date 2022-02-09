import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import axios from 'axios'
import  './login.css'

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFectching} = useContext(Context)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });

        dispatch({type: "LOGIN_SUCCESS", payload:res.data});

        } catch (err) {
        dispatch({type: "LOGIN_FAILURE"});
        }
    };
    // console.log(user);
    return (
        <div className='login'>
            <span className="loginTitle">Đăng nhập</span>
            <form  className="loginForm" onSubmit={handleSubmit}>
                <label>Tên tài khoản</label>
                <input className='loginInput' type="text" placeholder='Nhập tên tài khoản...' ref={userRef} />
                <label>Mật khẩu</label>
                <input className='loginInput' type="password" placeholder='Nhập mật khẩu' ref={passwordRef} />
                <button className='loginButton' type='submit' dispatch={isFectching}>Đăng nhập</button>
            </form>
            <button className='loginRegisterButton'>
                <Link className='link' to="/register">Đăng ký</Link>
            </button>
        </div>
    )
}