import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./sidebar.css"

export default function Sidebar() {
    const [cats, setCats] = useState([]);
    
    useEffect(() => {
        const getCats = async () =>{
            const res = await axios.get('/categories');
            setCats(res.data);
        };
        getCats();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ĐÔNG LÀO DÂN NỮ</span>
                <img src="https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-6/242245770_109415181489386_6305778914708588586_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=6CDtWPO5rQgAX_lYPi_&_nc_ht=scontent.fdad3-3.fna&oh=00_AT_0DBQ17sUWWXjVmYKpPCXMEqfmuxBbh3lm6mL7afDumw&oe=620815BD" alt="" />
                <p>“Thân em vừa trắng lại vừa tròn”; “Khuôn trăng đầy
                      đặn nét ngài nở nang”; “Mây thua nước tóc, tuyết nhường màu da”....</p>
            </div>
                {/* <div className="sidebarItem">
                <span className="sidebarTitle">THỂ LOẠI</span>
                <ul className="sidebarList">
                    {cats.map(c=>(
                        <Link to ={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem">{c.name}</li>
                        
                        </Link>
                    ))}


                </ul>

                </div> */}
                <div className="sidebarItem">
                <span className="sidebarTitle">THEO DÕI CHÚNG TÔI</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-facebook-messenger"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>

                </div>
        </div>
    )
}
