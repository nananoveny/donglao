import { Link } from "react-router-dom";
import "./topbar.css"
import React, { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
    const {user, dispatch} = useContext(Context);
   const PF = "http://localhost:5000/images/";

    const handleLogout = () =>{
        dispatch({type:"LOGOUT"});
    }
    
    return (
        <div className='top'>
            <div className="topLeft">
            <a href="https://www.facebook.com/donglaodannu/">
            <i className="topIcon fab fa-facebook-square"></i>
            </a>

            <a href="https://www.facebook.com/donglaodannu/">
            <i className="topIcon fab fa-facebook-messenger"></i>

            </a>

            <a href="https://www.facebook.com/donglaodannu/">
            <i className="topIcon fab fa-instagram-square"></i>
            </a>
                
            </div>

            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/" >TRANG CHỦ</Link>
                    </li>

                    <li className="topListItem">
                    <Link className="link" to="/" >VỀ CHÚNG TÔI</Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to="/" >LIÊN HỆ</Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to="/write" >VIẾT BÀI</Link>
                    </li>
                    

                </ul>
            </div>

            <div className="topRight">
                {
                    user ? (
                        <Link to="/settings">
                        <img className="topImg" src={PF + user.profilePic} alt="" />
                        
                        </Link>
                        
                        //show avatar
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                            <Link className="link" to="/login" >ĐĂNG NHẬP</Link>

                            </li>

                            {/* <li className="topListItem">
                            <Link className="link" to="/register" >ĐĂNG KÝ</Link>

                            </li> */}

                        </ul>
                    )
                }
                                {/* <i className="topSearchIcon fas fa-search"></i> */}
                    
                        <p className="topListItem" onClick={handleLogout}>
                        {user && "ĐĂNG XUẤT"}
                        </p>
            </div>
        </div>
    )
}
