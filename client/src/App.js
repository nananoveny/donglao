import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/home/single/Single";
import Write from "./pages/home/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import React, { useContext } from "react";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);

  return (
    // <div className="App">
    //   blog app
    // </div>
    <Router>
       <TopBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={user ? <Home/> :<Register/>}/>
        <Route path="/login" element={user ? <Home/> : <Login/>}/>
        <Route path="/write" element={user ? <Write/> : <Login/>}/>
        <Route path="/settings" element={user ? <Settings/> : <Register/>}/>
        <Route path="/post/:postId" element={<Single/>}/>
        <Route path="/" element={<Register/>}/>
        <Route path="/" element={<Register/>}/>
        <Route path="/" element={<Register/>}/>


        


      </Routes>

    </Router>

  

    
  );
}

export default App;
