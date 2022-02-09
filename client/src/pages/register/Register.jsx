import  './register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

export default function Register() {
    const [username, setUsername]= useState("");//useState - first status
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault(); //submit nhuwng k reload
        setError(false);

        try {
            const res = await axios.post("/auth/register", {
                username, 
                email, 
                password,
            });
            alert("Đăng ký thành công")
            res.data && window.location.replace('/login')
        } catch (error) {
        setError(true);
        alert("Đăng ký thất bại")
            
        }
        

    }

    return (
        <div className='register'>
            <span className="registerTitle">Đăng ký</span>
            <form  className="registerForm" onSubmit={handleSubmit}>
                <label>Tên tài khoản</label>
                <input className='registerInput' type="text" placeholder='Nhập tên tài khoản' onChange={e=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input className='registerInput' type="text" placeholder='Nhập email...' onChange={e=>setEmail(e.target.value)} />
                <label>Mật khẩu</label>
                <input className='registerInput' type="password" placeholder='Nhập mật khẩu' onChange={e=>setPassword(e.target.value)}/>
                <button className='registerButton'>Đăng ký</button>
            </form>
            <button className='registerLoginButton' type='submit'>
            <Link className='link' to="/login">Đăng nhập</Link>
                
            </button>
           
            {error &&   <span style ={{color: "red", marginTop:"10px"}}>Some thing wrong</span>}
        </div>
    )
}
