import axios from 'axios';
import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import './settings.css'

export default function Setting() {
    const {user} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:5000/images/";


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username: username,
            email: email,
            password: password,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updatedUser.profilePic = filename;
            try {
            await axios.post("/upload", data);
            } catch (error) {
                // console.log(error);
            }
        }
        try {
            const res = await axios.put("/users/"+ user._id, updatedUser)
            // window.location.replace("/settings/")
            setSuccess(true);

            // window.location.reload();

                console.log(res);
        } catch (error) {
                console.log(error);
            
        }
    };
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Cập nhật tài khoản</span>
                    <span className="settingsDeleteTitle">Xóa tài khoản</span>

                </div>
                <form className='settingsForm' onSubmit={handleSubmit}>
                    <label>Ảnh đại diện</label>
                    <div className="settingsPP">
                        <img src={ file ? URL.createObjectURL(file) : PF + user.profilePic } alt="" />

                        <label htmlFor="fileInput">
                        <i className="settingsPPIcon far fa-user"></i>
                        </label>
                        <input type="file"  id='fileInput' style={{display:"none"}}
                        onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <label>Tên tài khoản</label>
                    <input type="text" placeholder={user.username}
                    onChange={e=>setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email}
                    onChange={e=>setEmail(e.target.value)}/>
                    <label>Mật khẩu</label>
                    <input type="password" placeholder='*********'
                    onChange={e=>setPassword(e.target.value)}/>
                    <button className='settingsSubmit' type='submit'>Thay đổi</button>
                    {success && <span style={{color:"green"}}>Thông tin đã được cập nhập</span>}
                </form>
            </div>
            <Sidebar/>

        </div>
    )
}
